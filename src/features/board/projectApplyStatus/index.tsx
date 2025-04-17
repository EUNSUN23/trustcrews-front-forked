import Button from '@/components/ui/button';
import ProjectApplyStatusModal from '@/features/board/projectApplyStatus/components/ProjectApplyStatusModal';
import { useSetRecoilState } from 'recoil';
import { myProjectAppliesModalStateStore } from '@/features/projectApply/auth/store/MyProjectAppliesModalStateStore';

export function ProjectApplyStatus() {
  const setUserNoticeModal = useSetRecoilState(myProjectAppliesModalStateStore);
  return (
    <>
      <Button
        className='mt-10'
        type='button'
        onClickHandler={() => setUserNoticeModal({ isOpen: true })}
      >
        프로젝트 지원 현황
      </Button>
      <ProjectApplyStatusModal />
    </>
  );
}
