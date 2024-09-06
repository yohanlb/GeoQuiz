import { LuTwitter } from 'react-icons/lu';
import { Button } from '@components/ui/button';

export default function TwitterButton() {
  return (
    <Button
      variant='outline'
      size='sm'
      className='transform rounded-full bg-[#1DA1F2] text-xs font-semibold text-white transition-all duration-200 ease-in-out hover:scale-105 hover:bg-[#1a91da]'
      onClick={() => window.open('https://x.com/geoquiz_daily', '_blank')}
    >
      <LuTwitter className='mr-1 h-3 w-3' />
      Geoquiz is on Twitter!
    </Button>
  );
}
