import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import ButtonSkeleton from '@/components/ui/skeleton/ButtonSkeleton';

function MilestoneAddButtonSkeleton() {
  return (
    <ButtonSkeleton size='md' className='mb-4'>
      <span className='flex items-center'>
        <FaPlus className='tablet:w-3 tablet:h-3 mr-2' />
        마일스톤 추가
      </span>
    </ButtonSkeleton>
  );
}

export default MilestoneAddButtonSkeleton;
