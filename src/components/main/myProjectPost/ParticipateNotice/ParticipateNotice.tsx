'use client';

import React from 'react';
import ProjectApplyStatusBadge from '@/components/ui/badge/ProjectApplyStatusBadge';
import PositionBadge from '@/components/ui/badge/PositionBadge';
import { ProjectApplyDto } from '@/service/project/apply';

interface ParticipateNoticeProps {
  participateNotice: ProjectApplyDto;
}

function ParticipateNotice({
  participateNotice: { project_name, position_name, status },
}: ParticipateNoticeProps) {
  return (
    <div className='mobile:w-[320px] tablet:w-[450px] flex items-center justify-between'>
      <div className='min-w-0'>
        <div className='flex items-center gap-x-3'>
          <p className='mobile:text-sm tablet:text-xl font-semibold leading-6 text-gray-900'>
            {project_name}
          </p>
          <PositionBadge text={position_name} size='sm' />
        </div>
      </div>
      <div className='flex flex-none items-center'>
        <ProjectApplyStatusBadge status={status} size='sm' />
      </div>
    </div>
  );
}

export default ParticipateNotice;
