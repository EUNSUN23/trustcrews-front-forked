'use client';

import Button from '@/components/ui/Button';
import {
  activeTabState,
  selectedPositionState,
  selectedTechStackState,
} from '@/store/post/PostStateStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import ErrorPageContainer from '@/components/ui/error/ErrorPageContainer';
import ErrorMessage from '@/components/ui/error/ErrorMessage';
import Navigator from '@/components/ui/error/Navigator';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const resetActiveTab = useResetRecoilState(activeTabState);
  const resetSelectedTechStacks = useResetRecoilState(selectedTechStackState);
  const resetSelectedPosition = useResetRecoilState(selectedPositionState);

  const goHome = () => {
    resetActiveTab();
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
        <Button onClickHandler={() => reset()}>재시도</Button>
        <Button onClickHandler={goHome}>홈으로</Button>
      </Navigator>
    </ErrorPageContainer>
  );
}
