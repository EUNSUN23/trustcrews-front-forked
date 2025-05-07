import FormRowWide from '@/features/project/auth/shared/ui/form/FormRowWide';
import Button from '@/components/ui/form/Button';
import { useRouter } from 'next/navigation';
import { useResetRecoilState } from 'recoil';
import { useEffect } from 'react';
import PostTitle from '@/features/launch/auth/components/PostTitle';
import ProjectName from '@/features/launch/auth/components/ProjectName';
import ProjectSubject from '@/features/launch/auth/components/ProjectSubject';
import PositionSelector from '@/features/launch/auth/components/PositionSelector';
import ProjectDate from '@/features/launch/auth/components/ProjectDate';
import TechStackSelector from '@/features/launch/auth/components/TechStackSelector';
import Contact from '@/features/launch/auth/components/Contact';
import PostContent from '@/features/launch/auth/components/PostContent';
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
      <PostTitle />
      <div className='grid pc:grid-cols-2 tablet:grid-cols-1 gap-y-10 place-content-between mobile:place-content-center'>
        <ProjectName />
        <ProjectSubject />
        <PositionSelector />
        <ProjectDate />
        <TechStackSelector />
        <Contact />
      </div>
      <PostContent />
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
