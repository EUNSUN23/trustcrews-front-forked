'use client';

import dynamic from 'next/dynamic';
import UserProfileSkeleton from '@/features/user/private/contents/userProfile/UserProfileSkeleton';
import UserTrustScoreSkeleton from '@/features/user/private/components/userProfile/UserTrustScoreSkeleton';
import MyProjectHistorySkeleton from '@/features/projectHistory/private/myProjectHistory/contents/MyProjectHistorySkeleton';

const MyProjectHistory = dynamic(
  () =>
    import(
      '@/features/projectHistory/private/myProjectHistory/contents/MyProjectHistory'
    ),
  { ssr: false, loading: () => <MyProjectHistorySkeleton /> },
);

const UserProfile = dynamic(
  () => import('@/features/user/private/contents/userProfile/UserProfile'),
  { ssr: false, loading: () => <UserProfileSkeleton /> },
);

const UserTrustScore = dynamic(
  () => import('@/features/user/private/components/userProfile/UserTrustScore'),
  { ssr: false, loading: () => <UserTrustScoreSkeleton /> },
);

const UserPage = () => {
  return (
    <>
      <UserProfile />
      <UserTrustScore />
      <MyProjectHistory />
    </>
  );
};

export default UserPage;
