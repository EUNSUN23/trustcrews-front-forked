'use client';

import { useTransition } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { projectActiveNavState } from '@/features/project/auth/global/store/ProjectNavTabStateStore';
import { crewIdState } from '@/features/project/auth/projectCrews/store/CrewIdStateStore';
import { projectIdState } from '@/features/project/auth/global/store/ProjectIdStateStore';
import { useProjectCrewList } from '@/features/project/auth/projectCrews/service/getProjectCrewList';
import { PROJECT_MENU } from '@/features/project/auth/global/constants/projectMenu';
import { ProjectCrew } from '@/features/project/auth/projectCrews/types';
import Avatar from '@/shared/ui/Avatar';
import PositionBadge from '@/components/badge/PositionBadge';
import ProjectRoleBadge from '@/components/badge/ProjectRoleBadge';

const {
  CREWS: {
    child: {
      CREW_DETAIL: { value: PROJECT_CREW_DETAIL },
    },
  },
} = PROJECT_MENU;

const Crews = () => {
  const setActiveNavTab = useSetRecoilState(projectActiveNavState);
  const [_, startTransition] = useTransition();
  const setCrewIdState = useSetRecoilState(crewIdState);
  const projectId = useRecoilValue(projectIdState);
  const {
    data: {
      data: { projectMembers: crewList },
    },
  } = useProjectCrewList(projectId);

  const handleClickCrew = (projectMemberId: bigint) => {
    startTransition(() => {
      setActiveNavTab(PROJECT_CREW_DETAIL);
    });
    setCrewIdState(projectMemberId);
  };

  return (
    <section className='w-full flex flex-col items-center px-1'>
      <section className='w-full mobile:max-h-[400px] mx-auto  mobile:overflow-y-scroll'>
        <ul role='list' className='min-h-[350px]'>
          {crewList.map(
            ({
              position: { positionName },
              projectMemberAuth,
              user: { userId: projectMemberUseId, nickname, profileImgSrc },
              projectMemberId,
            }: ProjectCrew) => {
              return (
                <li
                  key={projectMemberUseId}
                  className='cursor flex items-center gap-x-6 py-5 cursor-pointer hover:bg-grey000 border-b border-grey300'
                  onClick={() => handleClickCrew(projectMemberId)}
                >
                  <div className='w-full min-w-0 flex mobile:flex-col items-center mobile:items-start mobile:space-y-3 tablet:px-6 mobile:pl-4'>
                    <div className='min-w-0 flex items-center tablet:space-x-6 mobile:space-x-4'>
                      <Avatar
                        size='xs'
                        src={profileImgSrc}
                        alt={`${nickname}의 프로필 이미지`}
                      />
                      <p className='tablet:text-[1.2rem] mobile:text-sm font-semibold leading-5 text-gray-900'>
                        {nickname}
                      </p>
                      <ul className='flex items-center space-x-3'>
                        <li>
                          <PositionBadge text={positionName} />
                        </li>
                        <li>
                          <ProjectRoleBadge auth={projectMemberAuth.code}>
                            {projectMemberAuth.name}
                          </ProjectRoleBadge>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              );
            },
          )}
        </ul>
      </section>
    </section>
  );
};

export default Crews;
