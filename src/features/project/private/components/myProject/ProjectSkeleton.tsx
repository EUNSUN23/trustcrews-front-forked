import Skeleton from '@/shared/ui/Skeleton';
import ProjectInfoSkeleton from '@/features/project/private/contents/myProject/ProjectInfoSkeleton';
import { PROJECT_MENU } from '@/features/project/private/constants/myProject/projectMenu';
import ProjectContentsSkeleton from '@/features/project/private/contents/myProject/ProjectContentsSkeleton';

const ProjectSkeleton = () => {
  return (
    <>
      <ProjectInfoSkeleton />
      <div className='tablet:my-[3.9rem] mobile:my-[3rem]'>
        <div className='border-b-[3px] border-grey300 pb-6'>
          <nav
            className='-mb-px flex tablet:space-x-10 mobile:justify-around'
            aria-label='Tabs'
          >
            {Object.values(PROJECT_MENU).map((v) => (
              <Skeleton
                key={v.name}
                sizeClassName='w-[90px] h-[45px] mobile:w-[60px] mobile:h-[40px] -mb-[1.8px] py-4 px-1 mobile:px-4'
              />
            ))}
          </nav>
        </div>
      </div>
      <ProjectContentsSkeleton />
    </>
  );
};

export default ProjectSkeleton;
