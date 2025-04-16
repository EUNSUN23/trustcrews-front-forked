import Skeleton from '@/components/ui/skeleton/Skeleton';
import cn from '@/utils/cn';

type FieldGroupSkeletonProps = {
  label: string;
  wrapperClassName?: string;
  labelClassName?: string;
  skeletonClassName?: string;
};

export function FieldGroupSkeleton({
  label,
  wrapperClassName,
  skeletonClassName,
  labelClassName,
}: FieldGroupSkeletonProps) {
  return (
    <div
      className={cn(
        'flex gap-5 min-h-10 items-center break-words',
        wrapperClassName,
      )}
    >
      <div
        className={cn(
          'text-grey800 w-[110px] mobile:w-[80px] text-xl mobile:text-sm whitespace-nowrap font-bold',
          labelClassName,
        )}
      >
        {label}
      </div>
      <Skeleton
        sizeClassName={cn(
          'w-[calc(100%-130px)] h-full mobile:h-5 mr-5 mobile:mr-0',
          skeletonClassName,
        )}
      />
    </div>
  );
}
