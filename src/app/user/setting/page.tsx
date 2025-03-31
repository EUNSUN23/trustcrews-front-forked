'use client';

import ProfileForm from '@/components/user/profile/ProfileForm';
import ProfileFormSkeleton from '@/components/user/profile/ProfileFormSkeleton';
import { useProfileInfo } from '@/hooks/user/useProfileInfo';

function UserSettingPage() {
  const { data, isFetching } = useProfileInfo();

  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)]'>
      {isFetching || (!isFetching && data!.data === null) ? (
        <ProfileFormSkeleton />
      ) : (
        <ProfileForm profileInfo={data!.data!} />
      )}
    </div>
  );
}

export default UserSettingPage;
