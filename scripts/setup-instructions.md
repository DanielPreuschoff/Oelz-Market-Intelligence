# Setup Instructions

> One-time steps to get the app running.

## 1. Create a Supabase project

1. Go to supabase.com and create a new project
2. Copy the project URL and anon key

## 2. Configure environment

```bash
cp .env.local.example .env.local
```

Fill in:
- `NEXT_PUBLIC_SUPABASE_URL` — from Supabase project settings
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Supabase project settings
- `SUPABASE_SERVICE_ROLE_KEY` — from Supabase project settings (keep secret)
- `ANTHROPIC_API_KEY` — from console.anthropic.com

## 3. Run the database migration

In Supabase Dashboard → SQL Editor, paste and run:

```
supabase/migrations/001_initial_schema.sql
```

Then run the seed data:

```
supabase/seed.sql
```

## 4. Create the first admin user

In Supabase Dashboard → Authentication → Users → Invite user

After the user confirms their email, go to SQL Editor and run:

```sql
update user_profiles
set is_admin = true
where id = (select id from auth.users where email = 'your-admin@email.com');
```

## 5. Install and run

```bash
npm install
npm run dev
```

Open http://localhost:3000 — you'll be redirected to login.

## 6. Create your first signal

1. Log in as admin
2. Click Admin → New Signal
3. Paste a competitor press release or news article
4. Click "Extract with AI"
5. Review and edit the extracted fields
6. Click "Save as Reviewed"

## 7. Create and publish your first edition

1. Click Admin → New Edition
2. Enter title and period month
3. Write an editorial summary
4. In the edition builder, add your reviewed signals
5. Order them by importance
6. Click "Publish Edition"

The edition will now appear on the home page for all logged-in users.

---

## Adding users (readers)

In Supabase Dashboard → Authentication → Users → Invite user

All invited users default to reader access (no admin). They can set their own role in Profile & Role.

To make someone an admin:
```sql
update user_profiles
set is_admin = true
where id = (select id from auth.users where email = 'person@oelz.at');
```
