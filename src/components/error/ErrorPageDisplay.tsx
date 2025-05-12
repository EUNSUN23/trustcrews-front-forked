import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HttpError } from '@/utils/clientApi/HttpError';
import DEFAULT_ERROR_MESSAGE from '@/constants/message/defaultErrorMessage';
import Button from '@/shared/ui/Button';

type ErrorPageDisplayProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPageDisplay = ({ error, reset }: ErrorPageDisplayProps) => {
  useEffect(() => {
    // todo - sentry 연결
    console.error(error);
  }, [error]);

  const router = useRouter();

  const handleClickGoHomeButton = () => {
    router.push('/');
  };

  const handleClickRetryButton = () => {
    reset();
  };

  const errorMessage =
    error instanceof HttpError
      ? error.responseBody.message
      : DEFAULT_ERROR_MESSAGE;

  return (
    <div className='flex flex-col items-center space-y-5 min-h-[calc(100vh/1.5)] mt-16 mb-12'>
      <div className='text-2xl font-semibold w-full text-center mb-5'>
        {errorMessage}
      </div>
      <div className='min-h-[80px] flex items-center space-x-2'>
        <Button onClick={handleClickRetryButton}>재시도</Button>
        <Button onClick={handleClickGoHomeButton}>홈으로</Button>
      </div>
    </div>
  );
};

export default ErrorPageDisplay;
