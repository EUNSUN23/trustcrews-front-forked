'use client';

import { Suspense } from 'react';
import { useRecoilState } from 'recoil';
import { myProjectAppliesModalStateStore } from '@/features/projectApply/auth/store/MyProjectAppliesModalStateStore';
import { createPortal } from 'react-dom';
import Modal from '@/shared/ui/Modal';
import MyProjectAppliesDetail from '../contents/MyProjectAppliesDetail';
import Skeleton from '@/shared/ui/Skeleton';
import useModalPortalElement from '@/shared/hooks/useModalPortalElement';
import { ITEM_COUNT_PER_PAGE } from '@/constants/pagination';

const MyProjectAppliesModal = () => {
  const [{ isOpen }, setIsOpen] = useRecoilState(
    myProjectAppliesModalStateStore,
  );

  const [portalElement] = useModalPortalElement(isOpen);

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
                    {Array.from({ length: ITEM_COUNT_PER_PAGE.LIST_SM }).map(
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
                <MyProjectAppliesDetail />
              </Suspense>
            </Modal>,
            portalElement as Element,
          )
        : null}
    </>
  );
};

export default MyProjectAppliesModal;
