'use client';

import UserProfile from '@/features/user/private/contents/userProfile/UserProfile';
import dynamic from 'next/dynamic';
import UserProfileSkeleton from '@/features/user/private/contents/userProfile/UserProfileSkeleton';
import { Suspense } from 'react';
import UserTrustScoreSkeleton from '@/features/user/private/components/userProfile/UserTrustScoreSkeleton';
import UserTrustScore from '@/features/user/private/components/userProfile/UserTrustScore';
import MyProjectHistorySkeleton from '@/features/projectHistory/private/myProjectHistory/contents/MyProjectHistorySkeleton';

const MyProjectHistory = dynamic(
  () =>
    import(
      '@/features/projectHistory/private/myProjectHistory/contents/MyProjectHistory'
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
