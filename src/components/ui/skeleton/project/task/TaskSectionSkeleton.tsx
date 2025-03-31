import TasksSkeleton from '@/components/ui/skeleton/project/task/TasksSkeleton';
import TaskSectionHeaderSkeleton from '@/components/ui/skeleton/project/task/TaskSectionHeaderSkeleton';
import { ITEM_COUNT } from '@/utils/constant';

function TaskSectionSkeleton() {
  return (
    <section className='w-full flex flex-col items-start'>
      <TaskSectionHeaderSkeleton />
      <TasksSkeleton itemCount={ITEM_COUNT.CARDS_SM} />
    </section>
  );
}

export default TaskSectionSkeleton;
