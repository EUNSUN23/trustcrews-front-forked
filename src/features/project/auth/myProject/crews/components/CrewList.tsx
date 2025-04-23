'use client';

import Avatar from '@/components/ui/Avatar';
import ProjectRoleBadge from '@/components/ui/badge/ProjectRoleBadge';
import PositionBadge from '@/components/ui/badge/PositionBadge';
import { ProjectCrew } from '@/features/project/auth/myProject/crews/types';
import { useProjectCrewList } from '@/features/project/auth/myProject/crews/service/getProjectCrewList';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { projectIdState } from '@/features/project/auth/myProject/global/store/ProjectIdStateStore';
import { crewIdState } from '@/features/project/auth/myProject/crews/store/CrewIdStateStore';
import { projectActiveNavState } from '@/features/project/auth/myProject/global/store/ProjectNavTabStateStore';
import { useTransition } from 'react';
import { PROJECT_MENU } from '@/features/project/auth/myProject/global/constants/projectMenu';

const {
  CREWS: {
    child: {
      CREW_DETAIL: { value: PROJECT_CREW_DETAIL },
    },
  },
} = PROJECT_MENU;

const CrewList = () => {
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
    <ul role='list' className='min-h-[350px]'>
      {crewList.map(
        ({
          position: { name },
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
                      <PositionBadge text={name} />
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
  );
};

export default CrewList;
