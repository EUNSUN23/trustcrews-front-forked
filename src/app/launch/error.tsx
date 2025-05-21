'use client';

import ErrorPageDisplay from '@/components/error/ErrorPageDisplay';

const LaunchErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return <ErrorPageDisplay error={error} reset={reset} />;
};

export default LaunchErrorPage;
