-- Knowledge base chatbot (sudah diterapkan ke project Supabase "Shaistanaya City CRM").
-- Disimpan di sini sebagai dokumentasi dan untuk membuat ulang di project lain.

create table public.chatbot_kb (
  id bigint generated always as identity primary key,
  category text not null,
  title text not null,
  content text not null,
  tags text[] not null default '{}',
  priority int not null default 0,
  active boolean not null default true,
  updated_at timestamptz not null default now(),
  fts tsvector
);

create index chatbot_kb_fts_idx on public.chatbot_kb using gin (fts);
create index chatbot_kb_category_idx on public.chatbot_kb (category);

-- Menjaga kolom fts dan updated_at tetap sinkron saat baris ditambah atau diubah.
create or replace function public.chatbot_kb_sync() returns trigger
language plpgsql set search_path = public as $$
begin
  new.updated_at := now();
  new.fts :=
    setweight(to_tsvector('indonesian', coalesce(new.title, '')), 'A') ||
    setweight(to_tsvector('indonesian', coalesce(array_to_string(new.tags, ' '), '')), 'A') ||
    setweight(to_tsvector('indonesian', coalesce(new.content, '')), 'B');
  return new;
end $$;

create trigger chatbot_kb_sync before insert or update on public.chatbot_kb
for each row execute function public.chatbot_kb_sync();

-- RLS aktif tanpa policy: tabel tidak bisa dibaca langsung lewat API publik.
alter table public.chatbot_kb enable row level security;

-- Backend mencari lewat fungsi ini (hanya baris aktif, maksimal 10).
create or replace function public.chatbot_kb_search(q text, n int default 6)
returns table (id bigint, category text, title text, content text)
language plpgsql stable security definer set search_path = public as $$
declare
  -- Kata umum yang tidak membantu membedakan topik.
  stop text[] := array['rumah','saya','aku','bisa','apa','ada','mau','kak','kakak','berapa','yang','untuk','dari','gak','nggak','tidak','atau','dan','ini','itu','dengan','sih','dong','nih','tapi','kalau','jadi','boleh','tanya','lihat','ingin','pengen','minta','tolong','halo','hai','selamat','pagi','siang','sore','malam','makasih','terima','kasih','ya','dimana','gimana','bagaimana','apakah','punya'];
  -- Singkatan dua huruf yang bermakna.
  short_ok text[] := array['dp','rs','ac'];
  terms text;
  tsq tsquery;
begin
  select string_agg(w, ' | ') into terms from (
    select distinct lower(w) as w
    from regexp_split_to_table(
      regexp_replace(left(coalesce(q, ''), 400), '[^[:alnum:] ]', ' ', 'g'), '\s+'
    ) as w
    where (length(w) >= 3 or lower(w) = any (short_ok)) and lower(w) <> all (stop)
    limit 20
  ) s;
  if terms is null then return; end if;
  tsq := to_tsquery('indonesian', terms);
  return query
    select k.id, k.category, k.title, k.content
    from public.chatbot_kb k
    where k.active and k.fts @@ tsq
    order by ts_rank_cd(k.fts, tsq) + k.priority * 0.05 desc, k.id
    limit least(greatest(n, 1), 10);
end $$;

revoke all on function public.chatbot_kb_search(text, int) from public;
grant execute on function public.chatbot_kb_search(text, int) to anon, authenticated, service_role;
