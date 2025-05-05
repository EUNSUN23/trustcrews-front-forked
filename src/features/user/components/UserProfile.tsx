'use client';

import { useRouter } from 'next/navigation';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/button';
import TechStackBadge from '@/components/ui/badge/TechStackBadge';
import { useUserDetailInfo } from '@/features/user/service/getUserDetailInfo';
import TrustGradeBadge from '@/components/ui/badge/TrustGradeBadge';

const UserProfile = () => {
  const router = useRouter();
  const {
    data: { data: profileInfo },
  } = useUserDetailInfo();

  const {
    nickname,
    profileImgSrc,
    trustScore,
    trustGrade,
    position,
    techStacks,
    intro,
    projectHistoryTotalCount,
  } = profileInfo;

  return (
    <div className='rounded-lg border-2 border-gray-200 bg-white mt-3 mobile:mt-2 px-2'>
      <div className='space-y-2 mobile:space-y-1 w-full h-fit text-center my-6 mobile:my-4'>
        <Avatar size='md' src={profileImgSrc} alt='사용자 프로필 이미지' />
        <div className='max-w-[300px] m-auto'>
          <p className='text-xl mobile:text-lg'>{nickname}</p>
          <p className='text-lg mobile:text-base text-grey700'>
            {position.positionName}
          </p>
          <p className='text-sm mobile:text-xs text-grey500'>{intro}</p>
        </div>
        <div>
          {techStacks.length > 0 &&
            techStacks.map((stack) => (
              <TechStackBadge
                key={stack.techStackId}
                size='xs'
                text={stack.techStackName}
                className='mx-0.5 w-[70px] mobile:w-[50px] justify-center'
              />
            ))}
        </div>
        <div className='flex space-x-3 text-center justify-center pt-2 mobile:pt-1'>
          <div className='flex flex-col space-y-1 border-r-2 pr-2 text-sm mobile:text-xs'>
            <p className='text-grey500'>프로젝트</p>
            <p>{projectHistoryTotalCount}</p>
          </div>
          <div className='flex flex-col text-sm mobile:text-xs'>
            <p className='text-grey500'>신뢰등급</p>
            <TrustGradeBadge
              badgeStyle='text'
              trustGrade={trustGrade.trustGradeName}
              size='sm'
              className=''
            />
          </div>
          <div className='flex flex-col space-y-1 border-l-2 pl-2 text-sm mobile:text-xs'>
            <p className='text-grey500 '>신뢰점수</p>
            <p>{trustScore}</p>
          </div>
        </div>
        <div className='pt-3 mobile:pt-2'>
          <Button
            size='md'
            theme='primaryHollow'
            onClick={() => router.push('/user/setting')}
          >
            프로필 수정
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
