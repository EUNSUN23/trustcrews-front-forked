import Link from 'next/link';

function LoginNav() {
  return (
    <Link
      aria-label='로그인 페이지'
      href='/login'
      className='mx-2 tablet:text-[20px] mobile:text-[16px] text-black100 font-semibold'
    >
      로그인
    </Link>
  );
}

export default LoginNav;
