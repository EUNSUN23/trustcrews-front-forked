'use client';

import { Fragment, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { RiCloseFill } from '@react-icons/all-files/ri/RiCloseFill';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { snackbarState } from '@/shared/store/SnackbarStateStore';
import { cva } from 'class-variance-authority';

const SnackbarVariants = cva(
  'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5',
  {
    variants: {
      variant: {
        DEFAULT: 'bg-white text-black',
        ERROR: 'bg-red-500 text-white',
        SUCCESS: 'bg-green-600 text-white',
        INFO: 'bg-blue-500 text-white',
      },
    },
    defaultVariants: {
      variant: 'DEFAULT',
    },
  },
);

const Snackbar = () => {
  const state = useRecoilValue(snackbarState);
  const resetSnackbar = useResetRecoilState(snackbarState);

  useEffect(() => {
    if (state.show) {
      const timer = setTimeout(() => {
        resetSnackbar();
        clearTimeout(timer);
      }, state?.duration || 5000);
    } else {
      resetSnackbar();
    }
  }, [state, resetSnackbar]);

  return (
    <div
      aria-live='assertive'
      aria-atomic='true'
      aria-hidden={!state.show}
      className='pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:p-6'
    >
      <h2 className='sr-only'>알림 메세지</h2>
      <div className='flex w-full flex-col items-center space-y-4 sm:items-end'>
        <Transition
          show={state.show}
          as={Fragment}
          enter='transform ease-out duration-300 transition'
          enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
          enterTo='translate-y-0 opacity-100 sm:translate-x-0'
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className={SnackbarVariants({ variant: state.type })}>
            <div className='p-4'>
              <div className='flex items-center'>
                <div className='flex w-0 flex-1 justify-between'>
                  <p className='w-0 flex-1 text-sm mobile:text-xs font-medium'>
                    {state.content}
                  </p>
                </div>
                <div className='ml-4 flex flex-shrink-0'>
                  <button
                    type='button'
                    className='inline-flex rounded-md focus:outline-none'
                    onClick={resetSnackbar}
                  >
                    <span className='sr-only'>닫기</span>
                    <RiCloseFill className='h-5 w-5' aria-hidden='true' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default Snackbar;
