'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ErrorPageContainer from '@/ui/error/ErrorPageContainer';
import ErrorMessage from '@/ui/error/ErrorMessage';
import Button from '@/shared/ui/Button';
import { HttpError } from '@/utils/clientApi/HttpError';
import DEFAULT_ERROR_MESSAGE from '@/constants/message/defaultErrorMessage';

const ProjectErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
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
    <ErrorPageContainer>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <div className='min-h-[80px] flex items-center space-x-2'>
        <Button onClick={handleClickRetryButton}>재시도</Button>
        <Button onClick={handleClickGoHomeButton}>홈으로</Button>
      </div>
    </ErrorPageContainer>
  );
};

export default ProjectErrorPage;
