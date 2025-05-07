import Button from '@/components/ui/form/Button';
import MyProjectAppliesModal from '@/features/projectApply/auth/components/MyProjectAppliesModal';
import { useSetRecoilState } from 'recoil';
import { myProjectAppliesModalStateStore } from '@/features/projectApply/auth/store/MyProjectAppliesModalStateStore';

const MyProjectApplies = () => {
  const setUserNoticeModal = useSetRecoilState(myProjectAppliesModalStateStore);

  const handleClickOpenModalButton = () => {
    setUserNoticeModal({ isOpen: true });
  };

  return (
    <>
      <Button
        className='mt-10'
        type='button'
        onClick={handleClickOpenModalButton}
      >
        프로젝트 지원 현황
      </Button>
      <MyProjectAppliesModal />
    </>
  );
};

export default MyProjectApplies;
