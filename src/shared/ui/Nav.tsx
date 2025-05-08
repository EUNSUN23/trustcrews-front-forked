import Link from 'next/link';
import { IoMdArrowRoundBack } from '@react-icons/all-files/io/IoMdArrowRoundBack';
import { UrlObject } from 'url';

type NavProps = {
  to: string | UrlObject;
};

const Nav = ({ to }: NavProps) => {
  return (
    <Link href={to}>
      <IoMdArrowRoundBack
        aria-hidden='true'
        className='tablet:h-12 tablet:w-12 mobile:h-6 mobile:w-6 text-grey700'
      />
    </Link>
  );
};

export default Nav;
