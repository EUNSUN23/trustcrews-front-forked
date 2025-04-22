import {
  MilestoneAddButtonSkeleton,
  MilestoneListSkeleton,
  TaskSectionSkeleton,
} from '@/components/ui/skeleton/project/task';

const JobSkeleton = () => {
  return (
    <section className='w-full flex flex-col items-start'>
      <MilestoneAddButtonSkeleton />
      <MilestoneListSkeleton />
      <TaskSectionSkeleton />
    </section>
  );
};

export default JobSkeleton;
