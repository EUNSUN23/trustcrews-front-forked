'use client';

import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { cva, VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { PROJECT_MENU } from '@/features/project/auth/myProject/global/constants/projectMenu';
import { projectActiveNavState } from '@/features/project/auth/myProject/global/store/ProjectNavTabStateStore';

const ProjectNavLinkVariants = cva({
  variants: {
    variant: {
      default:
        'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
      active: 'border-secondary text-secondary',
    },
  },
  defaultVariants: 'default',
});

type ProjectNavLinkVariantProps = VariantProps<typeof ProjectNavLinkVariants>;

const projectNavLinkClass = (isActive: boolean): ProjectNavLinkVariantProps =>
  clsx(
    'flex whitespace-nowrap border-b-[3px] -mb-[1.8px] py-4 px-1 mobile:px-4 pc:text-[2rem] tablet:text-[1.5rem] mobile:text-lg font-semibold',
    {
      default: !isActive,
      active: isActive,
    },
  );

const ProjectNavTab = () => {
  const [activeTab, setActiveTab] = useRecoilState(projectActiveNavState);
  const resetActiveTabName = useResetRecoilState(projectActiveNavState);

  useEffect(() => {
    return () => resetActiveTabName();
  }, [resetActiveTabName]);

  return (
    <div className='tablet:my-[3.9rem] mobile:mt-[1.5rem] mobile:mb-[3rem]'>
      <div className='border-b-[3px] border-grey300'>
        <nav className='-mb-px' aria-label='Tabs'>
          <ul className='flex tablet:space-x-10 mobile:justify-between'>
            {Object.values(PROJECT_MENU).map(({ name, value }) => (
              <li key={`tab-${value}`}>
                <div
                  className={ProjectNavLinkVariants(
                    projectNavLinkClass(value === activeTab),
                  )}
                  aria-current={value === activeTab}
                  onClick={(e) => setActiveTab(value)}
                >
                  {name}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProjectNavTab;
