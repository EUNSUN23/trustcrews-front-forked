'use client';

import UserProfile from '@/features/user/components/UserProfile';
import ProjectHistory from '@/components/user/profile/projectHistory/ProjectHistory';
import { Suspense } from 'react';
import ProjectHistorySkeleton from '@/components/user/profile/projectHistory/ProjectHistorySkeleton';

function ProfilePage() {
  return (
    <>
      <UserProfile />
      <Suspense fallback={<ProjectHistorySkeleton />}>
        <ProjectHistory />
      </Suspense>
    </>
  );
}

export default ProfilePage;
