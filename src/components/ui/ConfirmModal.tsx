'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import Modal from '@/components/ui/Modal';

import { confirmModalStateStore } from '@/shared/store/ConfirmModalStateStore';

function ConfirmModal() {
  const { isOpen, title, content, onClickConfirmHandler } = useRecoilValue(
    confirmModalStateStore,
  );
  const resetModalState = useResetRecoilState(confirmModalStateStore);
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById('modal'));

    if (!isOpen) {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflowY = 'auto';

      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isOpen]);

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
            portalElement,
          )
        : null}
    </>
  );
}

export default ConfirmModal;
