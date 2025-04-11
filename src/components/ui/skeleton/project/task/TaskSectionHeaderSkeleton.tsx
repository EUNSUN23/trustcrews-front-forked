import SquareSkeleton from '@/components/ui/skeleton/SquareSkeleton';
import BadgeStyleSkeleton from '@/components/ui/skeleton/BadgeStyleSkeleton';
import ButtonSkeleton from '@/components/ui/skeleton/ButtonSkeleton';

function TaskSectionHeaderSkeleton() {
  return (
    <div className='w-full flex items-center justify-start mb-4'>
      <ButtonSkeleton>+ 업무 추가</ButtonSkeleton>
      <div className='ml-4 mr-auto flex items-center space-x-3'>
        <SquareSkeleton className='my-2 tablet:text-3xl text-transparent'>
          마일스톤제목
        </SquareSkeleton>
        <BadgeStyleSkeleton text='시작전' size='md' />
        <div className='flex items-center space-x-3 tablet:text-xl text-transparent'>
          <SquareSkeleton>yyyy-mm-dd</SquareSkeleton>
          <SquareSkeleton>yyyy-mm-dd</SquareSkeleton>
        </div>
      </div>
    </div>
  );
}

export default TaskSectionHeaderSkeleton;
