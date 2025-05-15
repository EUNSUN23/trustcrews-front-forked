'use client';

import dynamic from 'next/dynamic';
import UserProfileSkeleton from '@/features/user/contents/userProfile/UserProfileSkeleton';
import UserTrustScoreSkeleton from '@/features/user/components/userProfile/UserTrustScoreSkeleton';
import MyProjectHistorySkeleton from '@/features/projectHistory/auth/myProjectHistory/contents/MyProjectHistorySkeleton';

const MyProjectHistory = dynamic(
  () =>
    import(
      '@/features/projectHistory/auth/myProjectHistory/contents/MyProjectHistory'
    ),
  { ssr: false, loading: () => <MyProjectHistorySkeleton /> },
);

const UserProfile = dynamic(
  () => import('@/features/user/contents/userProfile/UserProfile'),
  { ssr: false, loading: () => <UserProfileSkeleton /> },
);

const UserTrustScore = dynamic(
  () => import('@/features/user/components/userProfile/UserTrustScore'),
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
