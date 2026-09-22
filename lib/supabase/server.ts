import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const hasSupabaseEnv = () => Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function createClient() {
  if (!hasSupabaseEnv()) throw new Error('Supabase is not configured.');
  const cookieStore = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: { getAll: () => cookieStore.getAll(), setAll: (items: any[]) => { try { items.forEach(({ name, value, options }: any) => cookieStore.set(name, value, options)); } catch { /* Server Components cannot set cookies. */ } } },
  });
}
