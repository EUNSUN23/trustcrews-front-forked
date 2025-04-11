import Link from 'next/link';
import { LinkProps } from 'next/dist/client/link';
import { ReactNode } from 'react';
import cn from '@/utils/cn';

export type StyledLinkProps = LinkProps & {
  children?: ReactNode;
  className?: string;
};

function StyledLink({ children, ...props }: StyledLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        'mobile:text-sm tablet:text-base mobile:px-3 tablet:px-3.5 mobile:py-1 tablet:py-1.5 bg-primary text-white',
        props.className,
      )}
    >
      {children}
    </Link>
  );
}

export default StyledLink;
