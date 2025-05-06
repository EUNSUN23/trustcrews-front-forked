import PMAuth from '@/features/project/auth/projectManageAuth/contents/PMAuth';
import EndProject from '@/features/project/auth/endProject/contents/EndProject';
import ErrorPageContainer from '@/components/ui/error/ErrorPageContainer';
import ErrorMessage from '@/components/ui/error/ErrorMessage';
import ProjectInfoForm from '@/features/project/auth/updateProjectInfo/contents/ProjectInfoForm';
import { Suspense } from 'react';
import ProjectInfoFormSkeleton from '@/features/project/auth/updateProjectInfo/contents/ProjectInfoFormSkeleton';
import PostInfoForm from '@/features/project/auth/updatePostInfo/contents/PostInfoForm';
import PostInfoFormSkeleton from '@/features/project/auth/updatePostInfo/contents/PostInfoFormSkeleton';
import { useRecoilValue } from 'recoil';
import { projectManageAuthStateStore } from '@/features/project/auth/projectManageAuth/store/ProjectManageAuthStateStore';

const ProjectConfig = () => {
  const { configYn: isConfigAccessible } = useRecoilValue(
    projectManageAuthStateStore,
  );

  if (!isConfigAccessible)
    return (
      <ErrorPageContainer className='justify-center bg-ground200 rounded-md'>
        <ErrorMessage className='leading-loose mobile:text-base mobile:px-5'>
          접근 권한이 없습니다. 프로젝트 관리자에게 문의하세요
        </ErrorMessage>
      </ErrorPageContainer>
    );

  // todo - PMAuth suspense boundary & ProjectConfigSkeleton(ProjectContentsSkeleton에 추가)
  return (
    <section className='w-full mx-auto space-y-[100px]'>
      <Suspense fallback={<ProjectInfoFormSkeleton />}>
        <ProjectInfoForm />
      </Suspense>
      <Suspense fallback={<PostInfoFormSkeleton />}>
        <PostInfoForm />
      </Suspense>
      <PMAuth />
      <EndProject />
    </section>
  );
};

export default ProjectConfig;
