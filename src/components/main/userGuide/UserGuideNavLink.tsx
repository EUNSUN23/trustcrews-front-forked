import Link from 'next/link';
import { ReactNode } from 'react';

function UserGuideNavLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <li className='mr-6'>
      <Link
        href={href}
        className='flex items-center space-x-1 group font-bold text-teal-600'
      >
        <span aria-hidden='true'>👉</span>
        <div className='no-underline group-hover:underline text-lg mobile:text-sm'>
          {children}
        </div>
      </Link>
    </li>
  );
}

export default UserGuideNavLink;
