'use client';

import ErrorPageContainer from '@/components/ui/error/ErrorPageContainer';
import ErrorMessage from '@/components/ui/error/ErrorMessage';
import Navigator from '@/components/ui/error/Navigator';
import Button from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useResetRecoilState } from 'recoil';
import { activeBoardTabStore } from '@/features/board/store/BoardActiveStateStore';
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
      <Navigator>
        <Button onClick={() => reset()}>재시도</Button>
        <Button onClick={goHome}>홈으로</Button>
      </Navigator>
    </ErrorPageContainer>
  );
}
