import { createServerClient } from '@supabase/ssr';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookie = await cookieStore.get(name);
          return cookie?.value ?? '';
        },
        async set(
          name: string,
          value: string,
          options: Omit<ResponseCookie, 'name' | 'value'>,
        ) {
          try {
            await cookieStore.set(name, value, options);
          } catch {
            // Handle error if necessary
          }
        },
        async remove(
          name: string,
          options: Omit<ResponseCookie, 'name' | 'value'>,
        ) {
          try {
            await cookieStore.delete({ name, ...options });
          } catch {
            // Handle error if necessary
          }
        },
      },
    },
  );
}
