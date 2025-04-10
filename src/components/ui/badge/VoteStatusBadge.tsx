import { VoteStatusType } from '@/service/project/alert/type';
import { clsx } from 'clsx';
import { BadgeVariants } from '@/utils/badge';
import { HTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';
import cn from '@/utils/cn';

const VOTE_STATUS_COLOR = {
  PROCESSING: 'bg-green-50 text-green-700 ring-green-600/20',
  FINISHED: 'bg-slate-50 text-slate-600 ring-slate-700/20',
} as const;
const { PROCESSING, FINISHED } = VOTE_STATUS_COLOR;

const voteStatusBadgeColorClass = (voteStatus: VoteStatusType) =>
  clsx({
    [PROCESSING]: voteStatus.code === 'VSTAT1001',
    [FINISHED]: voteStatus.code === 'VSTAT1002',
  });

const VoteStatusBadgeVariants = (voteStatus: VoteStatusType) =>
  BadgeVariants(
    `inline-flex items-center rounded-full transparent font-medium  ring-1 ring-inset `,
    voteStatusBadgeColorClass(voteStatus),
  );

interface VoteStatusBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<ReturnType<typeof VoteStatusBadgeVariants>> {
  voteStatus: VoteStatusType;
}

function VoteStatusBadge({ voteStatus, size, ...props }: VoteStatusBadgeProps) {
  return (
    <>
      <span
        {...props}
        className={cn(
          VoteStatusBadgeVariants(voteStatus)({ size }),
          props.className,
        )}
      >
        {voteStatus.name}
      </span>
    </>
  );
}

export default VoteStatusBadge;
