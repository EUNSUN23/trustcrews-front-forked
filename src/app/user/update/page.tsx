'use client';

import UserUpdateButton from '@/features/userProfileEditor/contents/UserUpdateButton';
import UserProfileImgFormSkeleton from '@/features/userProfileEditor/contents/UserProfileImgFormSkeleton';
import UserInfoFormSkeleton from '@/features/userProfileEditor/contents/UserInfoFormSkeleton';
import dynamic from 'next/dynamic';

const UserProfileImgForm = dynamic(
  () => import('@/features/userProfileEditor/contents/UserProfileImgForm'),
  {
    ssr: false,
    loading: () => <UserProfileImgFormSkeleton />,
  },
);

const UserInfoForm = dynamic(
  () => import('@/features/userProfileEditor/contents/UserInfoForm'),
  { ssr: false, loading: () => <UserInfoFormSkeleton /> },
);

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
