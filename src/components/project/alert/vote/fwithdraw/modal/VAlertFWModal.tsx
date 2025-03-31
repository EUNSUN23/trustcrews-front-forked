import { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { vAlertFWModalState } from '@/store/project/alert/modal/VAlertModalStateStore';
import { createPortal } from 'react-dom';
import Modal from '@/components/ui/Modal';
import VAlertFWModalContents from '@/components/project/alert/vote/fwithdraw/modal/VAlertFWModalContents';

function VAlertFwModal() {
  const { isOpen, title, voteId, fwMemberId } =
    useRecoilValue(vAlertFWModalState);
  const resetVAlertFWModalState = useResetRecoilState(vAlertFWModalState);
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
              close={() => resetVAlertFWModalState()}
              title={title}
            >
              <VAlertFWModalContents voteId={voteId} fwMemberId={fwMemberId} />
            </Modal>,
            portalElement,
          )
        : null}
    </>
  );
}

export default VAlertFwModal;
