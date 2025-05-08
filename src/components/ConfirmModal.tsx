'use client';

import { createPortal } from 'react-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import Modal from '@/shared/ui/Modal';
import { confirmModalStateStore } from '@/store/ConfirmModalStateStore';
import useModalPortalElement from '@/shared/hooks/useModalPortalElement';

const ConfirmModal = () => {
  const { isOpen, title, content, onClickConfirmHandler } = useRecoilValue(
    confirmModalStateStore,
  );
  const resetModalState = useResetRecoilState(confirmModalStateStore);

  const [portalElement] = useModalPortalElement(isOpen);

  return (
    <>
      {isOpen && portalElement
        ? createPortal(
            <Modal
              isOpen={isOpen}
              close={resetModalState}
              title={title}
              onClickConfirmHandler={onClickConfirmHandler}
            >
              <section className='my-4 text-lg'>{content}</section>
            </Modal>,
            portalElement as Element,
          )
        : null}
    </>
  );
};

export default ConfirmModal;
