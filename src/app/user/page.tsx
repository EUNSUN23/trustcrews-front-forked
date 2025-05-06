'use client';

import UserProfile from '@/features/user/contents/UserProfile';
import MyProjectHistorySkeleton from '@/features/project/auth/myProjectHistory/contents/MyProjectHistorySkeleton';
import dynamic from 'next/dynamic';
import UserProfileSkeleton from '@/features/user/contents/UserProfileSkeleton';
import { Suspense } from 'react';

const MyProjectHistory = dynamic(
  () =>
    import(
      '@/features/project/auth/myProjectHistory/contents/MyProjectHistory'
    ),
  { ssr: false, loading: () => <MyProjectHistorySkeleton /> },
);

const UserPage = () => {
  return (
    <>
      <Suspense fallback={<UserProfileSkeleton />}>
        <UserProfile />
      </Suspense>
      <MyProjectHistory />
    </>
  );
};

export default UserPage;
