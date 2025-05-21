'use client';

import dynamic from 'next/dynamic';
import UserProfileSkeleton from '@/features/userProfile/contents/UserProfileSkeleton';
import UserTrustScoreSkeleton from '@/features/userProfile/components/UserTrustScoreSkeleton';
import UserProjectHistorySkeleton from '@/features/userProfile/contents/UserProjectHistorySkeleton';

const MyProjectHistory = dynamic(
  () => import('@/features/user/contents/userProjectHistory/MyProjectHistory'),
  { ssr: false, loading: () => <UserProjectHistorySkeleton /> },
);

const UserProfile = dynamic(
  () => import('@/features/userProfile/contents/UserProfile'),
  { ssr: false, loading: () => <UserProfileSkeleton /> },
);

const UserTrustScore = dynamic(
  () => import('@/features/userProfile/components/UserTrustScore'),
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
