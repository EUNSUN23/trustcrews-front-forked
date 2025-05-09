import { useRecoilValue, useResetRecoilState } from 'recoil';
import { createPortal } from 'react-dom';
import Modal from '@/shared/ui/Modal';
import RCVoteNoticeDetail from '@/features/projectNotice/private/contents/rcVoteNotice/RCVoteNoticeDetail';
import { rcVoteNoticeModalState } from '@/features/projectNotice/private/store/RCVoteNoticeModalStateStore';
import useModalPortalElement from '@/shared/hooks/useModalPortalElement';
import { Suspense } from 'react';
import RCVoteNoticeDetailSkeleton from '@/features/projectNotice/private/contents/rcVoteNotice/RCVoteNoticeDetailSkeleton';

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
