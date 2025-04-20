'use client';

import UserProfileForm from '@/features/user/components/UserProfileForm';
import UserProfileFormSkeleton from '@/features/user/components/UserProfileFormSkeleton';
import { useUserDetailInfo } from '@/features/user/service/getUserDetailInfo';

function UserSettingPage() {
  const { data, isFetching } = useUserDetailInfo();

  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)]'>
      {isFetching || (!isFetching && data!.data === null) ? (
        <UserProfileFormSkeleton />
      ) : (
        <UserProfileForm profileInfo={data!.data!} />
      )}
    </div>
  );
}

export default UserSettingPage;
