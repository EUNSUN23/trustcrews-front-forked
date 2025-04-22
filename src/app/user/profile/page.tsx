'use client';

import UserProfile from '@/features/user/components/UserProfile';
import MyProjectHistorySkeleton from '@/features/project/auth/myProjectHistory/components/MyProjectHistorySkeleton';
import dynamic from 'next/dynamic';

const MyProjectHistory = dynamic(
  () =>
    import(
      '@/features/project/auth/myProjectHistory/components/MyProjectHistory'
    ),
  { ssr: false, loading: () => <MyProjectHistorySkeleton /> },
);

const ProfilePage = () => {
  return (
    <>
      <UserProfile />
      <MyProjectHistory />
    </>
  );
};

export default ProfilePage;
