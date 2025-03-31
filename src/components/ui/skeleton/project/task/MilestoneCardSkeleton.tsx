import React from 'react';
import Skeleton from '@/components/ui/skeleton/Skeleton';

function MilestoneCardSkeleton() {
  return (
    <Skeleton sizeClassName='pc:max-w-[300px] tablet:max-w-[180px] py-4' />
  );
}

export default MilestoneCardSkeleton;
