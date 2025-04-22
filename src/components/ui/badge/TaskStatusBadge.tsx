import { clsx } from 'clsx';
import cn from '@/utils/cn';
import { HTMLAttributes } from 'react';
import { BadgeVariants } from '@/utils/badge';
import { VariantProps } from 'class-variance-authority';
import {
  TaskStatusCode,
  TaskStatusName,
} from '@/features/project/auth/myProject/jobs/types/task';

const STATUS_COLOR = {
  STANDBY: 'bg-grey900 text-grey000',
  PROCESSING: 'bg-[#FFF9CF] text-[#7B5C03]',
  COMPLETE: 'bg-[#F1F1F1] text-[#242D35]',
} as const;
const { STANDBY, COMPLETE, PROCESSING } = STATUS_COLOR;

const taskStatusBadgeClass = (statusCode: TaskStatusCode) =>
  clsx(`inline-flex items-center rounded-full font-medium`, {
    [STANDBY]: statusCode === 'PS001',
    [PROCESSING]: statusCode === 'PS002',
    [COMPLETE]: statusCode === 'PS003',
  });

const TaskStatusBadgeVariants = (statusCode: TaskStatusCode) =>
  BadgeVariants(taskStatusBadgeClass(statusCode));

interface TaskStatusBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<ReturnType<typeof TaskStatusBadgeVariants>> {
  statusName: TaskStatusName;
  statusCode: TaskStatusCode;
}

function TaskStatusBadge({
  statusName = '시작전',
  statusCode,
  size,
  ...props
}: TaskStatusBadgeProps) {
  return (
    <span
      className={cn(
        TaskStatusBadgeVariants(statusCode)({ size }),
        props.className,
      )}
    >
      {statusName}
    </span>
  );
}

export default TaskStatusBadge;
