'use client';

import { projectActiveNavState } from '@/store/project/ProjectNavTabStateStore';
import { useRecoilValue } from 'recoil';
import { PROJECT_MENU as PM } from '@/app/project/_utils/constant';
import { ReactNode } from 'react';

interface ProjectNavTabContentsProps {
  slots: {
    task: ReactNode;
    crews: ReactNode;
    notice: ReactNode;
    setting: ReactNode;
  };
}

function ProjectNavTabContents({
  slots: { task, crews, notice, setting },
}: ProjectNavTabContentsProps) {
  const activeNavTab = useRecoilValue(projectActiveNavState);

  let contents: ReactNode;
  switch (activeNavTab) {
    case PM.TASK.value:
      contents = task;
      break;
    case PM.CREWS.value:
      contents = crews;
      break;
    case PM.NOTICE.value:
      contents = notice;
      break;
    case PM.SETTING.value:
      contents = setting;
      break;
    default:
      contents = task;
  }

  return <>{contents}</>;
}

export default ProjectNavTabContents;
