import { makeImageSize } from '@/utils/common';
import React from 'react';

function AvatarSkeleton({
  size,
  className,
}: {
  size: string;
  className?: string;
}) {
  const imageSize = makeImageSize(size);
  return (
    <div
      className={`${imageSize} ${className} bg-gray-300 rounded-full animate-pulse`}
    ></div>
  );
}

export default AvatarSkeleton;
