import Link from 'next/link';

export function LogInButton() {
  return (
    <Link href='/login'>
      <span className='ml-1 underline text-blue-600'>로그인</span>
    </Link>
  );
}
