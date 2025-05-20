'use client';

import ErrorPageDisplay from '@/ui/error/ErrorPageDisplay';

const PostDetailPageError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return <ErrorPageDisplay error={error} reset={reset} />;
};

export default PostDetailPageError;
