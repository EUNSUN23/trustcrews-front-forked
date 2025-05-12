import ComposedBoundary from '@/components/error/ComposedBoundary';
import { ReactNode } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { HttpError } from '@/utils/clientApi/HttpError';
import cn from '@/shared/styles/cn';
import { CgRedo } from '@react-icons/all-files/cg/CgRedo';

type SuspenseFieldQueryBoundaryProps = {
  suspenseFallback: ReactNode;
  children: ReactNode;
  className?: string;
};

const FieldQueryBoundary = ({
  suspenseFallback,
  children,
  className,
}: SuspenseFieldQueryBoundaryProps) => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ComposedBoundary
      suspenseFallback={suspenseFallback}
      reset={reset}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div
          role='alert'
          className={cn(
            'w-full flex items-center justify-start space-x-3 text-gray-500',
            className,
          )}
        >
          <p>
            {error instanceof HttpError
              ? error.responseBody.message
              : '요청 수행 중 오류가 발생했습니다.'}
          </p>
          <button title='재시도' onClick={resetErrorBoundary}>
            <span className='sr-only'>재시도</span>
            <CgRedo aria-hidden={true} className={cn('size-7')} />
          </button>
        </div>
      )}
    >
      {children}
    </ComposedBoundary>
  );
};

export default FieldQueryBoundary;
