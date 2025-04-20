'use client';

import UserProfile from '@/features/user/components/UserProfile';
import { Suspense } from 'react';
import MyProjectHistorySkeleton from '@/features/project/auth/myProjectHistory/components/MyProjectHistorySkeleton';
import dynamic from 'next/dynamic';

const MyProjectHistory = dynamic(
  () =>
    import(
      '@/features/project/auth/myProjectHistory/components/MyProjectHistory'
    ),
  { ssr: false },
);

const ProfilePage = () => {
  return (
    <>
      <UserProfile />
      <Suspense fallback={<MyProjectHistorySkeleton />}>
        <MyProjectHistory />
      </Suspense>
    </>
  );
};

export default ProfilePage;
