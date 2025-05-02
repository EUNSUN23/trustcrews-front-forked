import { useRecoilValue, useResetRecoilState } from 'recoil';
import { createPortal } from 'react-dom';
import Modal from '@/components/ui/Modal';
import RCVoteNoticeDetail from '@/features/project/auth/projectNotice/contents/rcVoteNotice/RCVoteNoticeDetail';
import { rcVoteNoticeModalState } from '@/features/project/auth/projectNotice/store/RCVoteNoticeModalStateStore';
import useModalPortalElement from '@/hooks/common/useModalPortalElement';
import { Suspense } from 'react';
import RCVoteNoticeDetailSkeleton from '@/features/project/auth/projectNotice/contents/rcVoteNotice/RCVoteNoticeDetailSkeleton';

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
              close={resetRCVoteNoticeModalState}
              title={title}
            >
              <Suspense fallback={<RCVoteNoticeDetailSkeleton />}>
                <RCVoteNoticeDetail />
              </Suspense>
            </Modal>,
            portalElement as Element,
          )
        : null}
    </>
  );
};

export default RCVoteNoticeModal;
