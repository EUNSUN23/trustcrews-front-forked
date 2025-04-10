import { clsx } from 'clsx';
import {
  TaskStatusNameType,
  TaskStatusValueType,
} from '@/app/project/@task/_utils/type';
import cn from '@/utils/cn';
import { HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

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
  cva(taskStatusBadgeClass(statusCode), {
    variants: {
      size: {
        xs: 'text-[11px] mobile:text-[9px] px-2 mobile:px-1 py-0.5 mobile:py-0',
        sm: 'tablet:text-sm mobile:text-xs px-2 py-1',
        md: 'tablet:text-lg mobile:text-base tablet:px-8 mobile:px-4 tablet:py-4 mobile:py-2',
        lg: 'text-lg px-8 py-4',
      },
    },
  });

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
