'use client';

import Button from '@/shared/ui/Button';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import ApplyPositionDropdown from '@/features/post/public/components/postDetail/ApplyPositionDropdown';
import { useEffect } from 'react';
import { useApplyProject } from '@/service/applyProject/public/applyProject';
import { confirmModalStateStore } from '@/store/ConfirmModalStateStore';
import { PostDetailData } from '@/service/post/public/getPostDetail';
import { projectApplyPositionState } from '@/features/post/public/store/ApplyPositionStateStore';

const ApplyProject = ({ postInfo }: { postInfo: PostDetailData }) => {
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
      <ApplyPositionDropdown applyPositions={postInfo.postPositions} />
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
