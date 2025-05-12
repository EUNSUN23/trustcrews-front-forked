import { ErrorBoundary } from 'react-error-boundary';
import { ReactNode, Suspense } from 'react';
import { ErrorBoundaryPropsWithRender } from 'react-error-boundary/dist/declarations/src/types';

interface SuspenseQueryErrorBoundaryProps extends ErrorBoundaryPropsWithRender {
  suspenseFallback: ReactNode;
  children: ReactNode;
  reset: () => void;
}

const ComposedBoundary = ({
  suspenseFallback,
  children,
  fallbackRender,
  reset,
}: SuspenseQueryErrorBoundaryProps) => {
  return (
    <ErrorBoundary
      onError={(e: unknown) => {
        // todo - Sentry 로깅만 하고 콘솔 출력을 생략
        // Sentry.captureException(error);
        console.error((e as Error).cause);
      }}
      onReset={reset}
      fallbackRender={fallbackRender}
    >
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default ComposedBoundary;
