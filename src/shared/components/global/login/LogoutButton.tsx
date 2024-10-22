'use client';

import { LuLogOut } from 'react-icons/lu';
import { Button } from '@/src/shared/components/ui/button';
import { navigationLinks } from '@lib/data/navigation-links';
import { createClient } from '@lib/supabase/client';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) router.refresh();
    else console.error('Error logging out:', error.message);
  };

  return (
    <Button
      onClick={handleLogout}
      variant='outline'
      className='flex w-full max-w-sm items-center justify-center space-x-2 border-gray-600 bg-gray-700 text-white hover:bg-gray-600'
    >
      <span className='flex w-full justify-center gap-2'>
        {navigationLinks.logout.label}
        <LuLogOut className='h-5 w-5' />
      </span>
    </Button>
  );
};

export default LogoutButton;
