'use client';

import UserProfile from '@/features/user/components/UserProfile';
import { Suspense } from 'react';
import MyProjectHistorySkeleton from '@/features/project/auth/myProjectHistory/components/MyProjectHistorySkeleton';
import MyProjectHistory from '@/features/project/auth/myProjectHistory/components/MyProjectHistory';

function ProfilePage() {
  return (
    <>
      <UserProfile />
      <Suspense fallback={<MyProjectHistorySkeleton />}>
        <MyProjectHistory />
      </Suspense>
    </>
  );
}

export default ProfilePage;
