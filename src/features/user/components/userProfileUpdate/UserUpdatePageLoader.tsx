import UserInfoFormSkeleton from '@/features/user/contents/userProfileUpdate/UserInfoFormSkeleton';
import UserProfileImgFormSkeleton from '@/features/user/contents/userProfileUpdate/UserProfileImgFormSkeleton';

const UserUpdatePageLoader = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)]'>
      <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3'>
        <UserProfileImgFormSkeleton />
        <UserInfoFormSkeleton />
      </div>
    </div>
  );
};

export default UserUpdatePageLoader;
