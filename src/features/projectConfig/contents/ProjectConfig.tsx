import PostConfigForm from '@/features/projectConfig/contents/post/PostConfigForm';
import ProjectConfigFormSkeleton from '@/features/projectConfig/contents/project/ProjectConfigFormSkeleton';
import ProjectConfigForm from '@/features/projectConfig/contents/project/ProjectConfigForm';
import PMAuth from '@/features/projectConfig/contents/pmAuth/PMAuth';
import EndProject from '@/features/projectConfig/contents/endProject/EndProject';
import PMAuthSkeleton from '@/features/projectConfig/contents/pmAuth/PMAuthSkeleton';
import PostConfigFormSkeleton from '@/features/projectConfig/contents/post/PostConfigFormSkeleton';
import ConfigSummary from '@/entities/projectConfig/components/ConfigSummary';
import ConfigContainer from '@/entities/projectConfig/components/ConfigContainer';
import FieldQueryBoundary from '@/components/error/FieldQueryBoundary';

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
