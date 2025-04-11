import { getCookie } from 'cookies-next';
import { ProjectPostDetailData } from '@/utils/type';
import useApplyProject from '@/features/projectPost/applyProject/hooks/useApplyProject';
import Button from '@/components/ui/button';
import useSnackbar from '@/hooks/common/useSnackbar';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { confirmModalState } from '@/store/CommonStateStore';
import { isEqual } from 'lodash';
import { projectApplyPositionState } from '@/features/projectPost/applyProject/store/ApplyPositionStateStore';
import ApplyPositionDropdown from '@/features/projectPost/applyProject/ApplyPositionDropdown';

function ApplyProject({
  projectId,
  postInfo,
}: {
  projectId: bigint;
  postInfo: ProjectPostDetailData['post'];
}) {
  const { value: recruitPosition } = useRecoilValue(projectApplyPositionState);
  const currentUserId = getCookie('user_id');

  const { joinProject, isUpdating } = useApplyProject();

  const setModalState = useSetRecoilState(confirmModalState);
  const { setInfoSnackbar } = useSnackbar();
  const onConfirmHandler = () => {
    if (!currentUserId) {
      setInfoSnackbar('로그인 후 이용 가능합니다.');
      return;
    }

    if (recruitPosition === 0n) {
      setInfoSnackbar('포지션을 선택해 주세요.');
      return;
    }

    const title = '확인';
    const content = <span>선택하신 포지션으로 참여요청 하시겠습니까?</span>;

    setModalState({
      isOpen: true,
      title,
      content,
      onClickConfirmHandler: () =>
        joinProject({ projectId, positionId: recruitPosition }),
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
