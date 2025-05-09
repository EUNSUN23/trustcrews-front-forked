'use client';

import ErrorPageContainer from '@/ui/error/ErrorPageContainer';
import ErrorMessage from '@/ui/error/ErrorMessage';
import Button from '@/shared/ui/Button';
import { useRouter } from 'next/navigation';
import { useResetRecoilState } from 'recoil';
import { activeMainBoardTabStore } from '@/store/ActiveMainBoardTabStateStore';
import {
  selectedPositionState,
  selectedTechStackState,
} from '@/features/post/public/store/PostSearchStateStore';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const resetActiveBoardTab = useResetRecoilState(activeMainBoardTabStore);
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
