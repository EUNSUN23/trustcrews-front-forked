import { ChangeEvent, useRef } from 'react';
import { useRecoilState } from 'recoil';
import Avatar from '@/shared/ui/Avatar';
import Button from '@/shared/ui/Button';
import { userProfileImgFormStateStore } from '@/store/useProfileEditor/UserProfileImgFormStateStore';
import { useUserDetailInfo } from '@/features/userProfile/api/getUserDetailInfo';

const UserProfileImgForm = () => {
  const {
    data: {
      data: { profileImgSrc },
    },
  } = useUserDetailInfo();

  const fileRef = useRef<HTMLInputElement>(null);
  const [{ profileImg, hasUpdate }, setProfileImgForm] = useRecoilState(
    userProfileImgFormStateStore,
  );

  const handleChangeProfileImg = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0)
      setProfileImgForm({ hasUpdate: true, profileImg: files[0] });
  };

  const handleClickUploadFileButton = () => {
    if (fileRef.current) fileRef.current.click();
  };

  const handleClickUnloadFileButton = () => {
    setProfileImgForm({ hasUpdate: true, profileImg: null });
    if (fileRef.current) fileRef.current.value = '';
  };

  let imageSrc = profileImgSrc;
  if (hasUpdate) imageSrc = profileImg ? URL.createObjectURL(profileImg) : null;

  return (
    <>
      <div className='w-full h-fit text-center'>
        <Avatar size='lg' src={imageSrc} alt='사용자 프로필 이미지' />
      </div>
      <div className='text-center space-x-2'>
        <input
          ref={fileRef}
          type='file'
          accept='.png, .jpg, .jpeg, .gif'
          hidden
          onChange={handleChangeProfileImg}
        />
        <Button
          size='md'
          theme='primaryHollow'
          onClick={handleClickUploadFileButton}
        >
          변경
        </Button>
        <Button
          size='md'
          theme='primary'
          onClick={handleClickUnloadFileButton}
          hidden={!profileImg}
        >
          제거
        </Button>
      </div>
    </>
  );
};

export default UserProfileImgForm;
