import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  userInfoFormLoadingSelector,
  userInfoFormStateStore,
} from '@/features/user/store/UserInfoFormStateStore';
import { useUserDetailInfo } from '@/features/user/service/getUserDetailInfo';
import { useEffect } from 'react';
import Input from '@/shared/ui/Input';
import { NicknameControl } from '@/features/user/components/userProfileUpdate/form/NicknameControl';
import UpdatePositionControl from '@/features/user/components/userProfileUpdate/form/UpdatePositionControl';
import UpdateTechStackControl from '@/features/user/components/userProfileUpdate/form/UpdateTechStackControl';
import IntroductionControl from '@/features/user/components/userProfileUpdate/form/IntroductionControl';
import { bigIntToString } from '@/shared/utils/stringUtils';
import UserInfoFormSkeleton from '@/features/user/contents/userProfileUpdate/UserInfoFormSkeleton';

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
