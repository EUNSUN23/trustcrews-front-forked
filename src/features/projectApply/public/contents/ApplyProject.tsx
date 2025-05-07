'use client';

import Button from '@/components/ui/button';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { projectApplyPositionState } from '@/features/projectApply/auth/store/ApplyPositionStateStore';
import ApplyPositionDropdown from '@/features/projectApply/public/components/ApplyPositionDropdown';
import { useEffect } from 'react';
import { useApplyProject } from '@/features/projectApply/public/service/applyProject';
import { confirmModalStateStore } from '@/shared/store/ConfirmModalStateStore';
import { PostPublicInfoData } from '@/features/post/public/service/getPostPublicInfo';

const ApplyProject = ({ postInfo }: { postInfo: PostPublicInfoData }) => {
  const resetModalState = useResetRecoilState(confirmModalStateStore);
  const { setSuccessSnackbar, setErrorSnackbar, setInfoSnackbar } =
    useSnackbar();
  const resetRecruitPositionState = useResetRecoilState(
    projectApplyPositionState,
  );

  useEffect(() => {
    return () => resetRecruitPositionState();
  }, [resetRecruitPositionState]);

  const { value: recruitPosition } = useRecoilValue(projectApplyPositionState);

  const { mutate: joinProject, isPending: isUpdating } = useApplyProject({
    onSuccess: (res) => {
      resetRecruitPositionState();
      setSuccessSnackbar(res.message);
      resetModalState();
    },
    onError: (res) => {
      setErrorSnackbar(res.message);
    },
  });

  const setModalState = useSetRecoilState(confirmModalStateStore);

  const handleClickConfirmButton = () => {
    if (recruitPosition === 0n) {
      setInfoSnackbar('포지션을 선택해 주세요.');
      return;
    }

    setModalState({
      isOpen: true,
      title: '확인',
      content: <span>선택하신 포지션으로 참여요청 하시겠습니까?</span>,
      onClickConfirmHandler: () =>
        joinProject({
          projectId: postInfo.projectId,
          positionId: recruitPosition,
        }),
    });
  };

  return (
    <footer className='flex justify-center gap-5 my-5'>
      <ApplyPositionDropdown applyPositions={postInfo.boardPositions} />
      <Button
        type='button'
        size='lg'
        onClick={handleClickConfirmButton}
        disabled={isUpdating}
      >
        참여하기
      </Button>
    </footer>
  );
};

export default ApplyProject;
