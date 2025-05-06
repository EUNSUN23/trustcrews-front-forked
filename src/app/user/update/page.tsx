'use client';

import UserProfileImgForm from '@/features/user/contents/update/UserProfileImgForm';
import UserInfoForm from '@/features/user/contents/update/UserInfoForm';
import UserUpdateButton from '@/features/user/contents/update/UserUpdateButton';

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
