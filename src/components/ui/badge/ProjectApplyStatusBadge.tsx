import cn from '@/utils/cn';
import { ProjectApplyStatusData } from '@/features/board/projectApplyStatus/type';
import { clsx } from 'clsx';
import { HTMLAttributes } from 'react';

const STATUS_COLOR = {
  WAIT: 'bg-gray-50 ring-gray-500/10 text-gray-600',
  ACCEPT: 'bg-green-50 ring-green-600/20 text-green-700',
  REJECT: 'bg-yellow-50 ring-yellow-600/20 text-yellow-800',
} as const;
const { WAIT, ACCEPT, REJECT } = STATUS_COLOR;

const projectApplyStatusBadgeClass = (
  status: ProjectApplyStatusData['status'],
) =>
  clsx(
    'mr-2 inline-flex items-center rounded-md font-medium ring-1 ring-inset',
    {
      [WAIT]: status.code === 'PAS1001',
      [ACCEPT]: status.code === 'PAS1002',
      [REJECT]: status.code === 'PAS1003',
    },
  );

interface ProjectApplyStatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: ProjectApplyStatusData['status'];
}

export function ProjectApplyStatusBadge({
  status,
  ...props
}: ProjectApplyStatusBadgeProps) {
  return (
    <span
      className={cn(projectApplyStatusBadgeClass(status), props.className)}
      aria-hidden={true}
    >
      {status.name}
    </span>
  );
}
