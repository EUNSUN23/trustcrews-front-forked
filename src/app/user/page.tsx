'use client';

import UserProfile from '@/features/user/contents/UserProfile';
import MyProjectHistorySkeleton from '@/features/project/auth/myProjectHistory/contents/MyProjectHistorySkeleton';
import dynamic from 'next/dynamic';
import UserProfileSkeleton from '@/features/user/contents/UserProfileSkeleton';
import { Suspense } from 'react';
import UserTrustScore from '@/features/user/components/UserTrustScore';
import UserTrustScoreSkeleton from '@/features/user/components/UserTrustScoreSkeleton';

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
      <Suspense fallback={<UserTrustScoreSkeleton />}>
        <UserTrustScore />
      </Suspense>
      <MyProjectHistory />
    </>
  );
};

export default UserPage;
