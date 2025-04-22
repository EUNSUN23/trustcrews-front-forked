import Skeleton from '@/components/ui/skeleton/Skeleton';
import { PROJECT_MENU } from '@/features/project/auth/myProject/global/constants/projectMenu';

const ProjectNavTabSkeleton = () => {
  return (
    <div className='tablet:my-[3.9rem] mobile:mt-[1.5rem] mobile:mb-[3rem]'>
      <div className='border-b-[3px] border-grey300'>
        <nav className='-mb-px' aria-label='Tabs'>
          <ul className='flex tablet:space-x-10 mobile:justify-between'>
            {Object.values(PROJECT_MENU).map(({ name }) => (
              <li key={`tab-${name}`}>
                <Skeleton
                  className='border-transparent flex whitespace-nowrap border-b-[3px] -mb-[1.8px] py-4 px-1 mobile:px-4 pc:text-[2rem] tablet:text-[1.5rem] mobile:text-lg font-semibold'
                  text={name}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProjectNavTabSkeleton;
