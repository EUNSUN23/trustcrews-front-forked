import cn from '@/shared/styles/cn';
import { ProjectApplyStatusData } from '@/features/projectApply/auth/type';
import { clsx } from 'clsx';
import { HTMLAttributes } from 'react';
import baseBadgeVariants from '@/shared/styles/baseBadgeVariants';
import { cva, VariantProps } from 'class-variance-authority';

const STATUS_COLOR = {
  WAIT: 'bg-gray-50 ring-gray-500/10 text-gray-600',
  ACCEPT: 'bg-green-50 ring-green-600/20 text-green-700',
  REJECT: 'bg-yellow-50 ring-yellow-600/20 text-yellow-800',
} as const;
const { WAIT, ACCEPT, REJECT } = STATUS_COLOR;

const projectApplyStatusBadgeClass = (
  status: ProjectApplyStatusData['status'],
) =>
  clsx({
    [WAIT]: status.code === 'PAS1001',
    [ACCEPT]: status.code === 'PAS1002',
    [REJECT]: status.code === 'PAS1003',
  });

const ProjectApplyStatusBadgeVariants = cva(
  'mr-2 inline-flex items-center rounded-md font-medium ring-1 ring-inset',
  {
    variants: {
      applyStatus: {
        PAS1001: 'bg-gray-50 ring-gray-500/10 text-gray-600',
        PAS1002: 'bg-green-50 ring-green-600/20 text-green-700',
        PAS1003: 'bg-yellow-50 ring-yellow-600/20 text-yellow-800',
      },
      size: baseBadgeVariants.size,
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

interface ProjectApplyStatusBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof ProjectApplyStatusBadgeVariants> {}

export const ProjectApplyStatusBadge = ({
  applyStatus,
  size,
  ...props
}: ProjectApplyStatusBadgeProps) => {
  return (
    <span
      {...props}
      className={cn(ProjectApplyStatusBadgeVariants({ applyStatus, size }))}
      aria-hidden={true}
    >
      {props.children}
    </span>
  );
};
