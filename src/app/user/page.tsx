'use client';

import UserProfile from '@/features/user/private/contents/UserProfile';
import MyProjectHistorySkeleton from '@/features/project/auth/myProjectHistory/contents/MyProjectHistorySkeleton';
import dynamic from 'next/dynamic';
import UserProfileSkeleton from '@/features/user/private/contents/UserProfileSkeleton';
import { Suspense } from 'react';
import UserTrustScore from '@/features/user/private/components/UserTrustScore';
import UserTrustScoreSkeleton from '@/features/user/private/components/UserTrustScoreSkeleton';

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
