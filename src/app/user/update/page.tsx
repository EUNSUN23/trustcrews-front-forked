'use client';

import UserProfileForm from '@/features/user/components/UserProfileForm';
import UserProfileFormSkeleton from '@/features/user/components/UserProfileFormSkeleton';
import { Suspense } from 'react';

const UserUpdatePage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)]'>
      <Suspense fallback={<UserProfileFormSkeleton />}>
        <UserProfileForm />
      </Suspense>
    </div>
  );
};

export default UserUpdatePage;
