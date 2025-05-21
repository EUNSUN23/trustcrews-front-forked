import { ErrorBoundary } from 'react-error-boundary';
import { ReactNode, Suspense } from 'react';
import { ErrorBoundaryPropsWithRender } from 'react-error-boundary/dist/declarations/src/types';
import { HttpError } from '@/utils/error/HttpError';
import { HttpStatusCode } from 'axios';
import { useResetRecoilState } from 'recoil';
import { authStateStore } from '@/store/AuthStateStore';

interface SuspenseQueryErrorBoundaryProps extends ErrorBoundaryPropsWithRender {
  suspenseFallback: ReactNode;
  children: ReactNode;
  reset: () => void;
  isThrowingAllowed?: boolean;
}

const ComposedBoundary = ({
  suspenseFallback,
  children,
  fallbackRender,
  reset,
  isThrowingAllowed = true,
}: SuspenseQueryErrorBoundaryProps) => {
  const resetAuthState = useResetRecoilState(authStateStore);

  const willThrowError = (error: unknown) => {
    return (
      isThrowingAllowed &&
      error instanceof HttpError &&
      (error.status === HttpStatusCode.ServiceUnavailable ||
        error.status === HttpStatusCode.Unauthorized)
    );
  };

  return (
    <ErrorBoundary
      onError={(error: unknown) => {
        // todo - Sentry 로깅만 하고 콘솔 출력을 생략
        // Sentry.captureException(error);
        console.error((error as Error).cause);
        if (
          error instanceof HttpError &&
          error.status === HttpStatusCode.Unauthorized
        )
          resetAuthState();
        if (willThrowError(error)) throw error;
      }}
      onReset={reset}
      fallbackRender={fallbackRender}
    >
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default ComposedBoundary;
