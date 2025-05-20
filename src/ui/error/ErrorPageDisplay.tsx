import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/shared/ui/Button';
import { HttpError } from '@/utils/error/HttpError';
import { HttpStatusCode } from 'axios';
import { useResetRecoilState } from 'recoil';
import { authStateStore } from '@/store/AuthStateStore';

type ErrorPageDisplayProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPageDisplay = ({ error, reset }: ErrorPageDisplayProps) => {
  const resetAuthState = useResetRecoilState(authStateStore);

  useEffect(() => {
    // todo - sentry 연결
    console.error(error);

    if (
      error instanceof HttpError &&
      error.status === HttpStatusCode.Unauthorized
    )
      resetAuthState();
  }, [error, resetAuthState]);

  const router = useRouter();

  const handleClickGoHomeButton = () => {
    router.push('/');
  };

  const handleClickRetryButton = () => {
    reset();
  };

  const handleClickLoginButton = () => {
    router.push('/login');
  };

  const isRetryableError = (error: unknown) => {
    return (
      error instanceof HttpError &&
      error.status !== HttpStatusCode.ServiceUnavailable &&
      error.status !== HttpStatusCode.Unauthorized &&
      error.status !== HttpStatusCode.Forbidden
    );
  };

  const isUnauthorizedError = (error: unknown) => {
    return (
      error instanceof HttpError && error.status === HttpStatusCode.Unauthorized
    );
  };

  return (
    <div className='flex flex-col items-center space-y-5 min-h-[calc(100vh/1.5)] mt-16 mb-12'>
      <div className='text-2xl font-semibold w-full text-center mb-5'>
        {error.message}
      </div>
      <div className='min-h-[80px] flex items-center space-x-2'>
        {isRetryableError(error) && (
          <Button onClick={handleClickRetryButton}>재시도</Button>
        )}
        <Button onClick={handleClickGoHomeButton}>홈으로</Button>
        {isUnauthorizedError(error) && (
          <Button onClick={handleClickLoginButton}>로그인</Button>
        )}
      </div>
    </div>
  );
};

export default ErrorPageDisplay;
