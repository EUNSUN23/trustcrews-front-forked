import ErrorPageContainer from '@/components/error/ErrorPageContainer';
import ErrorMessage from '@/components/error/ErrorMessage';
import { Suspense } from 'react';
import PostInfoForm from '@/features/projectConfig/private/contents/postInfo/PostInfoForm';
import PostInfoFormSkeleton from '@/features/projectConfig/private/contents/postInfo/PostInfoFormSkeleton';
import { useRecoilValue } from 'recoil';
import ProjectInfoFormSkeleton from '@/features/projectConfig/private/contents/projectInfo/ProjectInfoFormSkeleton';
import ProjectInfoForm from '@/features/projectConfig/private/contents/projectInfo/ProjectInfoForm';
import PMAuth from '@/features/projectConfig/private/contents/pmAuth/PMAuth';
import EndProject from '@/features/projectConfig/private/contents/EndProject';
import { projectManageAuthStateStore } from '@/features/projectConfig/private/store/ProjectManageAuthStateStore';

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
