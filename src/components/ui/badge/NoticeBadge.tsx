import { AlertMenu, AlertMenuCode } from '@/service/project/alert/type';
import { BadgeVariants } from '@/utils/badge';
import { clsx } from 'clsx';
import { VariantProps } from 'class-variance-authority';
import cn from '@/utils/cn';
import { HTMLAttributes } from 'react';

const NOTICE_COLOR = {
  CREW: 'bg-blue-50 text-blue-700 ring-blue-700/10',
  RECRUIT: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
  FWITHDRAW: 'bg-red-50 text-red-700 ring-red-600/10',
} as const;
const { CREW, RECRUIT, FWITHDRAW } = NOTICE_COLOR;

const noticeBadgeColorClass = (menuCode: AlertMenuCode) =>
  clsx({
    [CREW]: menuCode === 'PRA2001',
    [RECRUIT]: menuCode === 'PRA1002',
    [FWITHDRAW]: menuCode === 'PRA1003',
  });

const NoticeBadgeVariants = (menuCode: AlertMenuCode) =>
  BadgeVariants(
    'inline-flex items-center rounded-full font-medium ring-1 ring-inset',
    noticeBadgeColorClass(menuCode),
  );

interface NoticeBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<ReturnType<typeof NoticeBadgeVariants>> {
  noticeType: AlertMenu;
}

function NoticeBadge({ noticeType, size, ...props }: NoticeBadgeProps) {
  return (
    <>
      <span
        {...props}
        className={cn(
          NoticeBadgeVariants(noticeType.code)({ size }),
          props.className,
        )}
      >
        {noticeType.name}
      </span>
    </>
  );
}

export default NoticeBadge;
