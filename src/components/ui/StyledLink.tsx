import { ButtonSize, ButtonTheme } from '@/utils/type';
import Link from 'next/link';
import { classNames, makeButtonColor, makeButtonSize } from '@/utils/common';
import { LinkProps } from 'next/dist/client/link';
import { ReactNode } from 'react';

export type StyledLinkProps = LinkProps & {
  size?: ButtonSize;
  theme?: ButtonTheme;
  children?: ReactNode;
  className?: string;
};

function StyledLink({
  size = 'md',
  theme = 'primary',
  children,
  ...props
}: StyledLinkProps) {
  const { textSize, px, py } = makeButtonSize(size);
  const { bgColor, textColor, ring } = makeButtonColor(theme);

  return (
    <Link
      {...props}
      className={classNames(
        props.className ? props.className : '',
        textSize,
        px,
        py,
        bgColor,
        textColor,
        ring,
        `rounded-full font-semibold ${textColor} shadow-sm`,
      )}
    >
      {children}
    </Link>
  );
}

export default StyledLink;
