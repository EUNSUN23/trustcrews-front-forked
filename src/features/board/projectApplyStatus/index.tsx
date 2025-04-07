import Button from '@/components/ui/Button';
import ProjectApplyStatusModal from '@/features/board/projectApplyStatus/components/ProjectApplyStatusModal';
import {useSetRecoilState} from 'recoil';
import {projectApplyStatusModalStore} from '@/features/board/projectApplyStatus/store/ProjectApplyStatusModalStore';

export function ProjectApplyStatus() {
  const setUserNoticeModal = useSetRecoilState(projectApplyStatusModalStore);
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
