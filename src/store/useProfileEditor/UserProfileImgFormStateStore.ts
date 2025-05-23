import { atom } from 'recoil';
import { UserProfileImgInput } from '@/features/userProfileEditor/api/updateUserDetail';

type UserProfileImgFormStateStore = {
  profileImg: UserProfileImgInput;
  hasUpdate: boolean;
};

export const userProfileImgFormStateStore = atom<UserProfileImgFormStateStore>({
  key: 'userProfileImgFormStateStore',
  default: {
    profileImg: null,
    hasUpdate: false,
  },
});
