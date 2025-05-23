import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  userInfoFormLoadingSelector,
  userInfoFormStateStore,
} from '@/store/useProfileEditor/UserInfoFormStateStore';
import { useUserDetailInfo } from '@/features/userProfile/api/getUserDetailInfo';
import { useEffect } from 'react';
import Input from '@/shared/ui/Input';
import { NicknameControl } from '@/features/userProfileEditor/components/NicknameControl';
import UpdatePositionControl from '@/features/userProfileEditor/components/UpdatePositionControl';
import UpdateTechStackControl from '@/features/userProfileEditor/components/UpdateTechStackControl';
import IntroductionControl from '@/features/userProfileEditor/components/IntroductionControl';
import { bigIntToString } from '@/shared/utils/stringUtils';
import UserInfoFormSkeleton from '@/features/userProfileEditor/contents/UserInfoFormSkeleton';

const UserInfoForm = () => {
  const setUserInfoForm = useSetRecoilState(userInfoFormStateStore);

  const [isUserInfoFormLoading, setIsUserInfoFormLoading] = useRecoilState(
    userInfoFormLoadingSelector,
  );

  const {
    data: { data: profileInfo },
  } = useUserDetailInfo();
  const { position, nickname, techStacks, intro, email } = profileInfo;

  const positionId = bigIntToString(position.positionId);
  const techStackIds = techStacks.map((v) => bigIntToString(v.techStackId));

  useEffect(() => {
    if (isUserInfoFormLoading) {
      setUserInfoForm({
        isFormLoading: false,
        data: {
          isCheckedNickname: false,
          positionId,
          nickname,
          techStackIds,
          intro,
        },
      });
      setIsUserInfoFormLoading(false);
    }
  }, [
    isUserInfoFormLoading,
    positionId,
    nickname,
    techStackIds,
    intro,
    setUserInfoForm,
    setIsUserInfoFormLoading,
  ]);

  if (isUserInfoFormLoading) return <UserInfoFormSkeleton />;

  return (
    <>
      <Input id='email' label='이메일' required disabled defaultValue={email} />
      <NicknameControl />
      <UpdatePositionControl />
      <UpdateTechStackControl />
      <IntroductionControl />
    </>
  );
};

export default UserInfoForm;
