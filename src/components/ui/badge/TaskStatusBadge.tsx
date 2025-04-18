import { clsx } from 'clsx';
import {
  TaskStatusNameType,
  TaskStatusValueType,
} from '@/app/project/@task/_utils/type';
import cn from '@/utils/cn';
import { HTMLAttributes } from 'react';
import { BadgeVariants } from '@/utils/badge';
import { VariantProps } from 'class-variance-authority';

const STATUS_COLOR = {
  STANDBY: 'bg-grey900 text-grey000',
  PROCESSING: 'bg-[#FFF9CF] text-[#7B5C03]',
  COMPLETE: 'bg-[#F1F1F1] text-[#242D35]',
} as const;
const { STANDBY, COMPLETE, PROCESSING } = STATUS_COLOR;

const taskStatusBadgeClass = (statusCode: TaskStatusValueType) =>
  clsx(`inline-flex items-center rounded-full font-medium`, {
    [STANDBY]: statusCode === 'PS001',
    [PROCESSING]: statusCode === 'PS002',
    [COMPLETE]: statusCode === 'PS003',
  });

const TaskStatusBadgeVariants = (statusCode: TaskStatusValueType) =>
  BadgeVariants(taskStatusBadgeClass(statusCode));

interface TaskStatusBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<ReturnType<typeof TaskStatusBadgeVariants>> {
  statusName: TaskStatusNameType;
  statusCode: TaskStatusValueType;
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
