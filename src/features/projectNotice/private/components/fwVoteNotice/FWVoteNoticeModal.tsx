import { useRecoilValue, useResetRecoilState } from 'recoil';
import { createPortal } from 'react-dom';
import Modal from '@/shared/ui/Modal';
import FWVoteNoticeDetail from '@/features/projectNotice/private/contents/fwVoteNotice/FWVoteNoticeDetail';
import { fwNoticeModalState } from '@/features/projectNotice/private/store/FWVoteNoticeModalStateStore';
import useModalPortalElement from '@/shared/hooks/useModalPortalElement';
import { Suspense } from 'react';
import FWVoteNoticeDetailSkeleton from '@/features/projectNotice/private/contents/fwVoteNotice/FWVoteNoticeDetailSkeleton';

const FWVoteNoticeModal = () => {
  const { isOpen, title } = useRecoilValue(fwNoticeModalState);
  const resetVAlertFWModalState = useResetRecoilState(fwNoticeModalState);

  const [portalElement] = useModalPortalElement(isOpen);

  return (
    <>
      {isOpen && portalElement
        ? createPortal(
            <Modal
              isOpen={isOpen}
              close={resetVAlertFWModalState}
              title={title}
            >
              <Suspense fallback={<FWVoteNoticeDetailSkeleton />}>
                <FWVoteNoticeDetail />
              </Suspense>
            </Modal>,
            portalElement as Element,
          )
        : null}
    </>
  );
};

export default FWVoteNoticeModal;
