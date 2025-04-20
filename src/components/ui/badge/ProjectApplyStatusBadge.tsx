import cn from '@/utils/cn';
import { ProjectApplyStatusData } from '@/features/projectApply/auth/type';
import { clsx } from 'clsx';
import { HTMLAttributes } from 'react';
import { BadgeVariants } from '@/utils/badge';
import { VariantProps } from 'class-variance-authority';

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

const ProjectApplyStatusBadgeVariants = (
  status: ProjectApplyStatusData['status'],
) =>
  BadgeVariants(
    'mr-2 inline-flex items-center rounded-md font-medium ring-1 ring-inset',
    projectApplyStatusBadgeClass(status),
  );

interface ProjectApplyStatusBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<ReturnType<typeof ProjectApplyStatusBadgeVariants>> {
  status: ProjectApplyStatusData['status'];
}

export function ProjectApplyStatusBadge({
  status,
  size,
  ...props
}: ProjectApplyStatusBadgeProps) {
  return (
    <span
      {...props}
      className={cn(ProjectApplyStatusBadgeVariants(status)({ size }))}
      aria-hidden={true}
    >
      {status.name}
    </span>
  );
}
