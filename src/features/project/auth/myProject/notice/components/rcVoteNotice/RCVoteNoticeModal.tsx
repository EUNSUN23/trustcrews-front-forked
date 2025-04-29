import { useRecoilValue, useResetRecoilState } from 'recoil';
import { createPortal } from 'react-dom';
import Modal from '@/components/ui/Modal';
import RCVoteNoticeModalContents from '@/features/project/auth/myProject/notice/components/rcVoteNotice/RCVoteNoticeModalContents';
import { rcVoteNoticeModalState } from '@/features/project/auth/myProject/notice/store/RCVoteNoticeModalStateStore';
import useModalPortalElement from '@/hooks/common/useModalPortalElement';

const RCVoteNoticeModal = () => {
  const resetRCVoteNoticeModalState = useResetRecoilState(
    rcVoteNoticeModalState,
  );

  const { isOpen, title } = useRecoilValue(rcVoteNoticeModalState);

  const [portalElement] = useModalPortalElement(isOpen);

  return (
    <>
      {isOpen && portalElement
        ? createPortal(
            <Modal
              isOpen={isOpen}
              close={() => resetRCVoteNoticeModalState()}
              title={title}
            >
              <RCVoteNoticeModalContents />
            </Modal>,
            portalElement as Element,
          )
        : null}
    </>
  );
};

export default RCVoteNoticeModal;
