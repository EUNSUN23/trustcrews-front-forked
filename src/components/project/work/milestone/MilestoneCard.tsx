'use client';
import React, { MouseEvent } from 'react';
import { MilestoneInfo, ProjectAuthMap } from '@/utils/type';
import MilestoneCardMenu from '@/components/project/work/milestone/MilestoneCardMenu';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  milestoneActiveStateStore,
  milestoneModDataStateSelector,
  milestoneModModalStateStore,
} from '@/store/project/task/MilestoneStateStore';
import { deleteMilestone as deleteMilestoneAPI } from '@/service/project/milestone';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { snackbarState } from '@/store/CommonStateStore';
import { bigIntToString } from '@/utils/common';

type MilestoneCardProps = {
  milestoneInfo: MilestoneInfo;
  initActiveMilestoneId: string | bigint | null;
  authMap: ProjectAuthMap;
};

function MilestoneCard({
  milestoneInfo,
  initActiveMilestoneId,
  authMap,
}: MilestoneCardProps) {
  const { projectId, milestoneId, content, startDate, endDate } = milestoneInfo;

  const setSnackBar = useSetRecoilState(snackbarState);

  const setActiveMilestone = useSetRecoilState(milestoneActiveStateStore);
  const resetActiveMilestone = useResetRecoilState(milestoneActiveStateStore);
  const { activeMilestoneId: updateActiveMilestoneId } = useRecoilValue(
    milestoneActiveStateStore,
  );

  const setMilestoneModModalState = useSetRecoilState(
    milestoneModModalStateStore,
  );
  const setMilestoneModDataMilestoneId = useSetRecoilState(
    milestoneModDataStateSelector('milestoneId'),
  );
  const setMilestoneModDataAuthMap = useSetRecoilState(
    milestoneModDataStateSelector('authMap'),
  );

  const queryClient = useQueryClient();
  const { mutate: deleteMilestone } = useMutation({
    mutationFn: (mileStoneId: bigint) =>
      deleteMilestoneAPI({
        projectId: projectId as bigint,
        milestoneId: mileStoneId,
        authMap: authMap.code,
      }),
    onSuccess: async (res) => {
      if (res.message !== 'success') {
        setSnackBar({
          show: true,
          content: '프로세스 수행중 에러가 발생했습니다.',
          type: 'ERROR',
        });
      } else {
        resetActiveMilestone();
        await queryClient.invalidateQueries({
          queryKey: ['milestoneList', bigIntToString(projectId)],
        });
        setSnackBar({
          show: true,
          content: '마일스톤을 삭제했습니다.',
          type: 'INFO',
        });
      }
    },
    onError: (error) => {
      console.error(error);
      setSnackBar({
        show: true,
        content: '프로세스 수행중 에러가 발생했습니다.',
        type: 'ERROR',
      });
    },
  });

  function onClickEditHandler() {
    setMilestoneModModalState((prev) => ({ ...prev, isOpen: true }));
    setMilestoneModDataMilestoneId(milestoneId);
    setMilestoneModDataAuthMap(authMap.code);
  }

  function onClickContentHandler(e: MouseEvent<HTMLElement>) {
    if ((e.target as HTMLElement).dataset.role === 'milestone-menu') return;
    setActiveMilestone({
      activeMilestone: milestoneInfo,
      activeMilestoneIndex: milestoneInfo.index || null,
      activeMilestoneId: milestoneId,
    });
  }

  async function onDeleteClickHandler() {
    if (confirm('마일스톤과 관련 업무를 삭제하시겠습니까?')) {
      await deleteMilestone(milestoneId);
    }
  }

  const activeMilestoneId =
    updateActiveMilestoneId !== null
      ? updateActiveMilestoneId
      : initActiveMilestoneId;

  const activeClass =
    activeMilestoneId === milestoneId ? 'ring-2 ring-primary' : 'shadow-md';
  const textClass =
    activeMilestoneId === milestoneId ? 'text-secondary' : 'text-gray-900';

  return (
    <div
      className={`relative flex pc:max-w-[300px] tablet:max-w-[180px] py-4 items-center justify-between truncate rounded-md border border-gray-200 bg-white overflow-visible ${activeClass} cursor-pointer`}
      onClick={onClickContentHandler}
    >
      <div className='flex-1 truncate px-4 text-sm'>
        <div
          className={`mb-2 flex flex-wrap items-center space-x-2 pc:text-xl tablet:text-lg ${textClass} hover:text-secondary`}
        >
          <span className='max-w-[150px] truncate'>{content}</span>
        </div>
        <div className='flex flex-wrap items-center justify-between space-x-1 pc:text-lg tablet:text-md text-gray-500'>
          <span>{startDate} &#126;</span>
          <span>{endDate}</span>
        </div>
      </div>
      <MilestoneCardMenu
        milestoneId={milestoneId}
        onEditClickHandler={onClickEditHandler}
        onDeleteClickHandler={onDeleteClickHandler}
      />
    </div>
  );
}

export default MilestoneCard;
