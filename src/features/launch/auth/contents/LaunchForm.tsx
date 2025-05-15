import FormRowWide from '@/ui/FormRowWide';
import Button from '@/shared/ui/Button';
import { useRouter } from 'next/navigation';
import { useResetRecoilState } from 'recoil';
import { useEffect } from 'react';
import LaunchPostTitleControl from '@/features/launch/auth/components/LaunchPostTitleControl';
import LaunchProjectNameControl from '@/features/launch/auth/components/LaunchProjectNameControl';
import LaunchProjectSubjectControl from '@/features/launch/auth/components/LaunchProjectSubjectControl';
import LaunchPositionControl from '@/features/launch/auth/components/LaunchPositionControl';
import LaunchProjectDateControl from '@/features/launch/auth/components/LaunchProjectDateControl';
import LaunchTechStackControl from '@/features/launch/auth/components/LaunchTechStackControl';
import LaunchContactControl from '@/features/launch/auth/components/LaunchContactControl';
import LaunchPostContentControl from '@/features/launch/auth/components/LaunchPostContentControl';
import { postFormStateStore } from '@/features/launch/auth/store/PostFormStateStore';
import { projectFormStateStore } from '@/features/launch/auth/store/ProjectFormStateStore';
import LaunchButton from '@/features/launch/auth/contents/LaunchButton';

const LaunchForm = () => {
  const router = useRouter();
  const resetPostFormState = useResetRecoilState(postFormStateStore);
  const resetProjectFormState = useResetRecoilState(projectFormStateStore);

  useEffect(() => {
    return () => {
      resetPostFormState();
      resetProjectFormState();
    };
  }, [resetPostFormState, resetProjectFormState]);

  const handleClickCancelButton = () => {
    router.push('/');
  };

  return (
    <div
      role='form'
      aria-label='게시글 및 프로젝트 생성'
      className='p-5 mobile:p-1 mb-8'
    >
      <LaunchPostTitleControl />
      <div className='grid pc:grid-cols-2 tablet:grid-cols-1 gap-y-10 place-content-between mobile:place-content-center'>
        <LaunchProjectNameControl />
        <LaunchProjectSubjectControl />
        <LaunchPositionControl />
        <LaunchProjectDateControl />
        <LaunchTechStackControl />
        <LaunchContactControl />
      </div>
      <LaunchPostContentControl />
      <FormRowWide className='space-x-2 text-center mt-10'>
        <Button theme='primaryHollow' onClick={handleClickCancelButton}>
          취소
        </Button>
        <LaunchButton />
      </FormRowWide>
    </div>
  );
};

export default LaunchForm;
