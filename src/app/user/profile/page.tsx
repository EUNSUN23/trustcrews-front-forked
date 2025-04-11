'use client';

import UserProfile from '@/features/user/components/UserProfile';
import ProjectHistory from '@/components/user/profile/projectHistory/ProjectHistory';

function ProfilePage() {
  return (
    <>
      <UserProfile />
      <ProjectHistory />
    </>
  );
}

export default ProfilePage;
