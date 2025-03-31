'use client';

import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userNoticeModalStateStore } from '@/store/UserNoticeModalStateStore';
import { createPortal } from 'react-dom';
import Modal from '@/components/ui/Modal';
import ParticipateNoticeModalContents from '@/components/main/myProjectPost/ParticipateNotice/ParticipateNoticeModalContents';
import { useQueryClient } from '@tanstack/react-query';

function ParticipateNoticeModal() {
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const [{ isOpen }, setIsOpen] = useRecoilState(userNoticeModalStateStore);
  const queryClient = useQueryClient();

  useEffect(() => {
    setPortalElement(document.getElementById('modal'));

    if (!isOpen) {
      queryClient.removeQueries({ queryKey: ['userProjectNotice'] });
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflowY = 'auto';

      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isOpen, queryClient]);

  return (
    <>
      {isOpen && portalElement
        ? createPortal(
            <Modal
              isOpen={isOpen}
              close={() => {
                setIsOpen({ isOpen: false });
              }}
              title='프로젝트 지원 현황'
              onClickConfirmHandler={() => {
                setIsOpen({ isOpen: false });
              }}
            >
              <ParticipateNoticeModalContents />
            </Modal>,
            portalElement,
          )
        : null}
    </>
  );
}

export default ParticipateNoticeModal;
