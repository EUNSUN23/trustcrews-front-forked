import Link from 'next/link';
import { IoMdArrowRoundBack } from '@react-icons/all-files/io/IoMdArrowRoundBack';
import { UrlObject } from 'url';

interface BackNavProps {
  to: string | UrlObject;
}

function HomeNav({ to }: BackNavProps) {
  return (
    <Link href={to} aria-label='홈으로 가기'>
      <IoMdArrowRoundBack
        aria-hidden='true'
        className='tablet:h-12 tablet:w-12 mobile:h-6 mobile:w-6 text-grey700'
      />
    </Link>
  );
}

export default HomeNav;
