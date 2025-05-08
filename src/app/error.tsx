'use client';

import Button from '@/shared/ui/Button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import ErrorPageContainer from '@/components/error/ErrorPageContainer';
import ErrorMessage from '@/components/error/ErrorMessage';
import { activeBoardTabStore } from '@/features/board/store/BoardActiveStateStore';
import {
  selectedPositionState,
  selectedTechStackState,
} from '@/features/post/public/store/PostSearchStateStore';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const resetActiveBoardTab = useResetRecoilState(activeBoardTabStore);
  const resetSelectedTechStacks = useResetRecoilState(selectedTechStackState);
  const resetSelectedPosition = useResetRecoilState(selectedPositionState);

  const goHome = () => {
    resetActiveBoardTab();
    resetSelectedTechStacks();
    resetSelectedPosition();

    router.push('/');
  };

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorPageContainer>
      <ErrorMessage>에러가 발생했습니다.</ErrorMessage>
      <div className='min-h-[80px] flex items-center space-x-2'>
        <Button onClick={() => reset()}>재시도</Button>
        <Button onClick={goHome}>홈으로</Button>
      </div>
    </ErrorPageContainer>
  );
}
