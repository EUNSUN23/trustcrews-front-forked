import Link from 'next/link';

export function SignUpButton() {
  return (
    <Link href='/signup'>
      <span className='ml-1 underline text-blue-600'>회원가입</span>
    </Link>
  );
}
