import PostConfigForm from '@/features/projectConfig/auth/contents/post/PostConfigForm';
import ProjectConfigFormSkeleton from '@/features/projectConfig/auth/contents/project/ProjectConfigFormSkeleton';
import ProjectConfigForm from '@/features/projectConfig/auth/contents/project/ProjectConfigForm';
import PMAuth from '@/features/projectConfig/auth/contents/pmAuth/PMAuth';
import EndProject from '@/features/projectConfig/auth/contents/EndProject';
import PMAuthSkeleton from '@/features/projectConfig/auth/contents/pmAuth/PMAuthSkeleton';
import PostConfigFormSkeleton from '@/features/projectConfig/auth/contents/post/PostConfigFormSkeleton';
import ConfigSummary from '@/features/projectConfig/auth/layouts/ConfigSummary';
import ConfigContainer from '@/features/projectConfig/auth/layouts/ConfigContainer';
import FieldQueryBoundary from '@/ui/error/FieldQueryBoundary';

const ProjectConfig = () => {
  return (
    <section className='w-full mx-auto space-y-[100px]'>
      <FieldQueryBoundary
        errorFallbackSize='md'
        suspenseFallback={<ProjectConfigFormSkeleton />}
      >
        <ProjectConfigForm />
      </FieldQueryBoundary>
      <FieldQueryBoundary
        errorFallbackSize='md'
        suspenseFallback={<PostConfigFormSkeleton />}
      >
        <PostConfigForm />
      </FieldQueryBoundary>
      <ConfigContainer>
        <ConfigSummary>크루 권한</ConfigSummary>
        <FieldQueryBoundary
          errorFallbackSize='md'
          suspenseFallback={<PMAuthSkeleton />}
        >
          <PMAuth />
        </FieldQueryBoundary>
      </ConfigContainer>
      <EndProject />
    </section>
  );
};

export default ProjectConfig;
