'use client';

import { useState } from 'react';
import { createClient } from '@lib/supabase/client';

const useGoogleLogin = (nextUrl?: string) => {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    const postLoginUrl = `/auth/callback`;
    const redirectTo = `${location.origin}${postLoginUrl}?next=${nextUrl || '/'}`;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'profile email',
        redirectTo,
        queryParams: {
          prompt: 'select_account',
        },
      },
    });

    setLoading(false);

    if (error) {
      setError('Error with Google login: ' + error.message);
      console.error(error);
      return null;
    }

    return data.url;
  };

  return { handleGoogleLogin, loading, error };
};

export default useGoogleLogin;
