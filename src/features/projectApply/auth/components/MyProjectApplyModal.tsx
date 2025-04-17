'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { myProjectAppliesModalStateStore } from '@/features/projectApply/auth/store/MyProjectAppliesModalStateStore';
import { createPortal } from 'react-dom';
import Modal from '@/components/ui/Modal';
import { useQueryClient } from '@tanstack/react-query';
import ProjectApplyStatusList from './MyProjectApplyList';
import { ITEM_COUNT } from '@/utils/constant';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import { getMyProjectAppliesQueryKey } from '@/features/projectApply/auth/service/getMyProjectApplies';

function MyProjectApplyModal() {
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const [{ isOpen }, setIsOpen] = useRecoilState(
    myProjectAppliesModalStateStore,
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    setPortalElement(document.getElementById('modal'));

    if (!isOpen) {
      queryClient.removeQueries({ queryKey: getMyProjectAppliesQueryKey });
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
              <Suspense
                fallback={
                  <div className='w-[470px] max-h-[300px] overflow-y-auto divide-y divide-gray-100 px-2 py-5 space-y-4 mobile:w-[340px]'>
                    {Array.from({ length: ITEM_COUNT.LIST_SM }).map(
                      (_, index) => (
                        <Skeleton
                          key={`skeleton-${index}`}
                          className='w-full h-10'
                        />
                      ),
                    )}
                  </div>
                }
              >
                <ProjectApplyStatusList />
              </Suspense>
            </Modal>,
            portalElement,
          )
        : null}
    </>
  );
}

export default MyProjectApplyModal;
