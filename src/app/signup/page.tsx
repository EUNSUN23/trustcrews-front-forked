import SignUp from '@/features/signup';
import { LogInButton } from '@/features/login/LogInButton';

function SignUpPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-100px)]'>
      <h1 className='text-3xl mobile:text-2xl font-semibold w-full text-center mb-4 mobile:mb-2 mt-6 mobile:mt-4'>
        회원가입
      </h1>
      <SignUp />
      <div className='text-center text-sm mobile:text-xs mt-2 mb-6 mobile:mb-4'>
        이미 회원이신가요?
        <LogInButton />
      </div>
    </div>
  );
}

export default SignUpPage;
