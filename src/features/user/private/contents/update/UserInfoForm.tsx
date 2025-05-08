import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  userInfoFormLoadingSelector,
  userInfoFormStateStore,
} from '@/features/user/private/store/UserInfoFormStateStore';
import { useUserDetailInfo } from '@/features/user/private/service/getUserDetailInfo';
import { useEffect } from 'react';
import Input from '@/shared/ui/Input';
import { NicknameControl } from '@/features/user/private/components/form/NicknameControl';
import PositionControl from '@/features/user/private/components/form/PositionControl';
import TechStackControl from '@/features/user/private/components/form/TechStackControl';
import IntroductionControl from '@/features/user/private/components/form/IntroductionControl';
import { bigIntToString } from '@/shared/utils/stringUtils';

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

  if (isUserInfoFormLoading) return null;

  return (
    <>
      <Input id='email' label='이메일' required disabled defaultValue={email} />
      <NicknameControl />
      <PositionControl />
      <TechStackControl />
      <IntroductionControl />
    </>
  );
};

export default UserInfoForm;
