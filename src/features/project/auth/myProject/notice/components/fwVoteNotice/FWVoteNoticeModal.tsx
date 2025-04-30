import { useRecoilValue, useResetRecoilState } from 'recoil';
import { createPortal } from 'react-dom';
import Modal from '@/components/ui/Modal';
import FWVoteNoticeModalContents from '@/features/project/auth/myProject/notice/components/fwVoteNotice/FWVoteNoticeModalContents';
import { fwNoticeModalState } from '@/features/project/auth/myProject/notice/store/FWVoteNoticeModalStateStore';
import useModalPortalElement from '@/hooks/common/useModalPortalElement';
import { Suspense } from 'react';
import FWVoteNoticeModalSkeleton from '@/features/project/auth/myProject/notice/components/fwVoteNotice/FWVoteNoticeModalSkeleton';

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
              <Suspense fallback={<FWVoteNoticeModalSkeleton />}>
                <FWVoteNoticeModalContents />
              </Suspense>
            </Modal>,
            portalElement as Element,
          )
        : null}
    </>
  );
};

export default FWVoteNoticeModal;
