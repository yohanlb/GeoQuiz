// called when user redirect from google OAuth
import { createClient } from '@lib/supabase/server';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get('code');

  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // TODO handle here updating user data in db
      // updateUserProfile();
      // redirect user to specified redirect URL or root of app
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error('Error verifying OTP:', error);
  }

  console.error('Unexpected error occurred during OAuth:');

  // Redirect to error page with a general message
  const errorUrl = new URL('/error', origin);
  errorUrl.searchParams.set(
    'message',
    'No code provided or an unexpected error occurred during authentication',
  );
  return NextResponse.redirect(errorUrl.toString());
}
