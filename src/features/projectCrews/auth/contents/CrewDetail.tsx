import { GrScorecard } from '@react-icons/all-files/gr/GrScorecard';
import CrewTaskHistory from '@/features/projectCrews/auth/contents/crewInfo/CrewTaskHistory';
import CrewFWCreateModal from '@/features/projectCrews/auth/contents/crewManage/CrewFWCreateModal';
import CrewProfileSkeleton from '@/features/projectCrews/auth/contents/crewInfo/CrewProfileSkeleton';
import CrewTaskHistorySkeleton from '@/features/projectCrews/auth/contents/crewInfo/CrewTaskHistorySkeleton';
import CrewProfile from '@/features/projectCrews/auth/contents/crewInfo/CrewProfile';
import Button from '@/shared/ui/Button';
import { useSetRecoilState } from 'recoil';
import { projectActiveNavState } from '@/features/project/auth/store/myProject/ProjectNavTabStateStore';
import { PROJECT_MENU } from '@/features/project/auth/constants/myProject/projectMenu';
import FieldQueryBoundary from '@/components/error/FieldQueryBoundary';

const {
  CREWS: { value: PROJECT_CREWS },
} = PROJECT_MENU;
export const CrewDetail = () => {
  const setProjectActiveNav = useSetRecoilState(projectActiveNavState);

  return (
    <section className='w-full flex flex-col items-center px-1 '>
      <section className='w-full flex items-center justify-start mb-12 mobile:mb-8'>
        <Button
          theme='primary'
          size='xl'
          onClick={() => setProjectActiveNav(PROJECT_CREWS)}
        >
          크루 목록
        </Button>
      </section>
      <section className='pc:min-h-[300px] tablet:py-3 border-b-2 border-gray-200'>
        <FieldQueryBoundary
          errorFallbackSize='md'
          suspenseFallback={<CrewProfileSkeleton />}
        >
          <CrewProfile />
        </FieldQueryBoundary>
      </section>
      <section className='pc:w-[95%] tablet:w-[95%] mobile:min-w-[75%] mt-12 mobile:mt-6'>
        <div className='flex items-center pc:text-3xl tablet:text-2xl mobile:text-lg font-semibold text-greyDarkBlue'>
          <GrScorecard className='tablet:text-[1.5rem]' />
          <h3 className='ml-2'>업무 이력</h3>
        </div>
        <FieldQueryBoundary
          errorFallbackSize='md'
          suspenseFallback={<CrewTaskHistorySkeleton />}
        >
          <CrewTaskHistory />
        </FieldQueryBoundary>
      </section>
      <CrewFWCreateModal />
    </section>
  );
};
