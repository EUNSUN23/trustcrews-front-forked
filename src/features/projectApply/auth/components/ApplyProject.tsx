'use client';

import { getCookie } from 'cookies-next';
import { PostPublicInfoData } from '@/utils/type';
import Button from '@/components/ui/button';
import useSnackbar from '@/hooks/common/useSnackbar';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { confirmModalState } from '@/store/CommonStateStore';
import { isEqual } from 'lodash';
import { projectApplyPositionState } from '@/features/projectApply/auth/store/ApplyPositionStateStore';
import ApplyPositionDropdown from '@/features/projectApply/auth/components/ApplyPositionDropdown';
import { useEffect } from 'react';
import { useApplyProject } from '@/features/projectApply/auth/service/applyProject';

function ApplyProject({ postInfo }: { postInfo: PostPublicInfoData }) {
  const resetModalState = useResetRecoilState(confirmModalState);
  const { setSuccessSnackbar, setErrorSnackbar, setInfoSnackbar } =
    useSnackbar();
  const resetRecruitPositionState = useResetRecoilState(
    projectApplyPositionState,
  );

  useEffect(() => {
    return () => resetRecruitPositionState();
  }, [resetRecruitPositionState]);

  const { value: recruitPosition } = useRecoilValue(projectApplyPositionState);
  const currentUserId = getCookie('user_id');

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

  const setModalState = useSetRecoilState(confirmModalState);

  const onConfirmHandler = () => {
    if (!currentUserId) {
      setInfoSnackbar('로그인 후 이용 가능합니다.');
      return;
    }

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

  const isRecruiter = isEqual(
    currentUserId?.toString(),
    postInfo.user.userId.toString(),
  );
  if (isRecruiter) return null;

  return (
    <footer className='flex justify-center gap-5 my-5'>
      <ApplyPositionDropdown recruitPositions={postInfo.boardPositions} />
      <Button
        type='button'
        size='lg'
        onClickHandler={onConfirmHandler}
        disabled={isUpdating}
      >
        참여하기
      </Button>
    </footer>
  );
}

export default ApplyProject;
