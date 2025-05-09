'use client';

import UserProfileImgForm from '@/features/user/private/contents/userProfileUpdate/UserProfileImgForm';
import UserInfoForm from '@/features/user/private/contents/userProfileUpdate/UserInfoForm';
import UserUpdateButton from '@/features/user/private/contents/userProfileUpdate/UserUpdateButton';

const UserUpdatePage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)]'>
      <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3'>
        <UserProfileImgForm />
        <UserInfoForm />
        <UserUpdateButton />
      </div>
    </div>
  );
};

export default UserUpdatePage;
