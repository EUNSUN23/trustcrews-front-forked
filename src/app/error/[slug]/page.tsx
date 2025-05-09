import StyledLink from '@/shared/ui/StyledLink';
import ErrorPageContainer from '@/ui/error/ErrorPageContainer';
import ErrorMessage from '@/ui/error/ErrorMessage';
import { HttpStatus } from '@/app/api/_interceptor/utils/httpStatus';

const Page = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { error: string };
}) => {
  const status = parseInt(params.slug, 10);
  return (
    <ErrorPageContainer className=''>
      <p className=' text-8xl font-semibold text-secondary/50 leading-relaxed'>
        {status}
      </p>
      <ErrorMessage className='leading-loose'>
        {searchParams.error}
      </ErrorMessage>
      {status === HttpStatus.UNAUTHORIZED && (
        <div className='min-h-[80px] flex items-center space-x-2'>
          <StyledLink href='/login'>로그인</StyledLink>
          <StyledLink href='/'>홈으로</StyledLink>
        </div>
      )}
      {status === HttpStatus.FORBIDDEN && (
        <div className='min-h-[80px] flex items-center space-x-2'>
          <StyledLink href='/'>홈으로</StyledLink>
        </div>
      )}
    </ErrorPageContainer>
  );
};

export default Page;
