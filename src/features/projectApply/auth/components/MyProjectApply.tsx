import Button from '@/components/ui/button';
import MyProjectApplyModal from '@/features/projectApply/auth/components/MyProjectApplyModal';
import { useSetRecoilState } from 'recoil';
import { myProjectAppliesModalStateStore } from '@/features/projectApply/auth/store/MyProjectAppliesModalStateStore';

export function MyProjectApply() {
  const setUserNoticeModal = useSetRecoilState(myProjectAppliesModalStateStore);
  return (
    <>
      <Button
        className='mt-10'
        type='button'
        onClick={() => setUserNoticeModal({ isOpen: true })}
      >
        프로젝트 지원 현황
      </Button>
      <MyProjectApplyModal />
    </>
  );
}
