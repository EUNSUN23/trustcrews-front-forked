import React, { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { vAlertRecruitModalState } from '@/store/project/alert/modal/VAlertModalStateStore';
import { createPortal } from 'react-dom';
import Modal from '@/components/ui/Modal';
import VAlertRecruitModalContents from '@/components/project/alert/vote/recruit/modal/VAlertRecruitModalContents';

function VAlertRecruitModal() {
  const { isOpen, title, voteId, applyId, alertId } = useRecoilValue(
    vAlertRecruitModalState,
  );
  const resetVAlertRecruitModalState = useResetRecoilState(
    vAlertRecruitModalState,
  );
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
              close={() => resetVAlertRecruitModalState()}
              title={title}
            >
              <VAlertRecruitModalContents
                voteId={voteId}
                applyId={applyId}
                alertId={alertId}
              />
            </Modal>,
            portalElement,
          )
        : null}
    </>
  );
}

export default VAlertRecruitModal;
