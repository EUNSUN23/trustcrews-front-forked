import { useRecoilValue, useResetRecoilState } from 'recoil';
import { createPortal } from 'react-dom';
import Modal from '@/shared/ui/Modal';
import FWVoteNoticeDetail from '@/features/projectNotice/contents/fwVoteNotice/FWVoteNoticeDetail';
import { fwNoticeModalState } from '@/features/projectNotice/store/fwVoteNotice/FWVoteNoticeModalStateStore';
import useModalPortalElement from '@/shared/hooks/useModalPortalElement';
import FWVoteNoticeDetailSkeleton from '@/features/projectNotice/contents/fwVoteNotice/FWVoteNoticeDetailSkeleton';
import FieldQueryBoundary from '@/components/error/FieldQueryBoundary';

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
              <FieldQueryBoundary
                errorFallbackSize='md'
                suspenseFallback={<FWVoteNoticeDetailSkeleton />}
              >
                <FWVoteNoticeDetail />
              </FieldQueryBoundary>
            </Modal>,
            portalElement as Element,
          )
        : null}
    </>
  );
};

export default FWVoteNoticeModal;
