'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { RiCloseFill } from '@react-icons/all-files/ri/RiCloseFill';
import Button from '@/components/ui/button';
import { ModalState } from '@/utils/type';

interface ModalProps extends ModalState {
  children: ReactNode;
  close: () => void;
  onClickConfirmHandler?: () => void;
  isUpdating?: boolean;
  footer?: ReactNode;
}

function Modal({
  isOpen,
  close,
  title,
  onClickConfirmHandler,
  children,
  isUpdating = false,
  footer,
}: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.position = 'fixed';
      document.body.style.top = '0px';
      document.body.style.overflowY = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflowY = 'auto';

      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isOpen]);

  const clickModalOutside = (event: MouseEvent) => {
    if (isOpen && ref.current && !ref.current.contains(event.target as Node)) {
      close();
    }
  };

  useEffect(() => {
    ref.current?.scrollTo(0, 0);

    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    document.addEventListener('mousedown', clickModalOutside);
    return () => {
      document.removeEventListener('mousedown', clickModalOutside);
    };
  });

  if (!isOpen) return null;

  return (
    <div className='inset-0 z-10 w-full h-screen overflow-y-auto'>
      <div className='absolute inset-0 w-full h-full bg-gray-500 opacity-75'></div>
      <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        ></span>
        {/*모달 컨텐츠 시작 */}
        <div
          ref={ref}
          className='relative inline-block transition-all transform sm:align-middle mobile:w-max-[320px] tablet:max-w-[600px]'
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          <div>
            <div className='rounded-lg pb-8 bg-white shadow'>
              {/* Start modal header */}
              <div className='pt-4 px-4 pb-[.25rem] relative w-full flex items-center border-b border-grey200'>
                <h3 className='mobile:text-2xl tablet:text-[1.75rem] text-black100 font-semibold max-w-[90%]'>
                  {title}
                </h3>
                <div className='absolute top-3 right-3'>
                  <button
                    type='button'
                    className='bg-transparent'
                    onClick={() => close()}
                  >
                    <RiCloseFill className='text-3xl' />
                  </button>
                </div>
              </div>
              {/* End modal header */}
              <div className='px-8 py-4'>{children}</div>
              {/* Start modal footer */}
              {footer ? (
                footer
              ) : (
                <div className='h-[4rem] mobile:w-[6.8rem] tablet:w-[7.8rem] flex items-center justify-between mx-auto'>
                  <Button
                    size='md'
                    disabled={isUpdating}
                    className={`${isUpdating && '!bg-gray-400 !text-white'}`}
                    onClickHandler={() => {
                      if (typeof onClickConfirmHandler === 'function')
                        onClickConfirmHandler();
                      else close();
                    }}
                  >
                    확인
                  </Button>
                  <Button
                    size='md'
                    theme='cancel'
                    onClickHandler={() => close()}
                  >
                    닫기
                  </Button>
                </div>
              )}
              {/* End modal footer */}
            </div>
          </div>
        </div>
        {/*모달 컨텐츠 끝 */}
      </div>
    </div>
  );
}

export default Modal;
