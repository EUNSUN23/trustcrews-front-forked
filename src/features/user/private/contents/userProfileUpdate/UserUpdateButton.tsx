import FormButton from '@/ui/FormButton';
import useSnackbar from '@/shared/hooks/useSnackbar';
import {
  userInfoInputSchema,
  userProfileImgInputSchema,
  useUpdateUserDetail,
} from '@/features/user/private/service/updateUserDetail';
import { ZodError } from 'zod';
import { useRecoilValue } from 'recoil';
import { userInfoFormStateStore } from '@/features/user/private/store/UserInfoFormStateStore';
import { userProfileImgFormStateStore } from '@/features/user/private/store/UserProfileImgFormStateStore';
import { numStrToBigInt } from '@/shared/utils/stringUtils';

const UserUpdateButton = () => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const { data: infoForm } = useRecoilValue(userInfoFormStateStore);
  const { profileImg, hasUpdate: hasProfileImgUpdate } = useRecoilValue(
    userProfileImgFormStateStore,
  );

  const { mutate: updateUser } = useUpdateUserDetail({
    onSuccess: (res) => setSuccessSnackbar(res.message),
    onError: (error) => setErrorSnackbar(error.message),
  });

  const handleClickSaveProfileButton = () => {
    const info = {
      ...infoForm,
      positionId: numStrToBigInt(infoForm.positionId),
      techStackIds: infoForm.techStackIds.map((item) => numStrToBigInt(item)),
    };

    try {
      userInfoInputSchema.parse(info);
    } catch (e: unknown) {
      setErrorSnackbar((e as ZodError).errors[0].message);
      return;
    }

    if (hasProfileImgUpdate) {
      try {
        userProfileImgInputSchema.parse(profileImg);
      } catch (e: unknown) {
        if (e instanceof ZodError) setErrorSnackbar(e.errors[0].message);
        return;
      }
    }

    updateUser(hasProfileImgUpdate ? { info, profileImg } : { info });
  };

  return <FormButton onClick={handleClickSaveProfileButton}>저장</FormButton>;
};

export default UserUpdateButton;
