'use client';
import React from 'react';
import { projectActiveNavState } from '@/store/project/ProjectNavTabStateStore';
import { useRecoilValue } from 'recoil';
import { PROJECT_MENU as PM } from '@/app/project/_utils/constant';

interface ProjectNavTabContentsProps {
  slots: {
    task: React.ReactNode;
    crews: React.ReactNode;
    notice: React.ReactNode;
    setting: React.ReactNode;
  };
}

function ProjectNavTabContents({
  slots: { task, crews, notice, setting },
}: ProjectNavTabContentsProps) {
  const activeNavTab = useRecoilValue(projectActiveNavState);

  let contents: React.ReactNode;
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
