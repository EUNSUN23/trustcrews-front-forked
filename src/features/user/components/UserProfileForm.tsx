'use client';

import { ChangeEvent, useRef, useState } from 'react';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/button';
import Input from '@/components/ui/form/Input';
import NicknameField from '@/components/ui/form/NickNameField';
import TextArea from '@/components/ui/form/TextArea';
import FormButton from '@/components/ui/form/FormButton';
import { PositionId, ProfileInfo, TechStackValueType } from '@/utils/type';
import { deleteProfileImage as deleteProfileImageAPI } from '@/service/user/user';
import { useMutation } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import PositionSelect from '@/components/ui/selector/PositionSelect';
import TechStackSelect from '@/components/ui/selector/TechStackSelect';
import {
  updateUserDetailSchema,
  useUpdateUserDetail,
} from '@/features/user/service/updateUserDetail';
import useSnackbar from '@/hooks/common/useSnackbar';
import { ZodError } from 'zod';

function UserProfileForm({ profileInfo }: { profileInfo: ProfileInfo }) {
  const {
    position,
    profileImgSrc,
    nickname: initNickname,
    techStacks: initTechStack,
    intro: initIntroduction,
    email,
  } = profileInfo;

  const [imageSrc, setImageSrc] = useState<string | null>(
    () => profileImgSrc ?? null,
  );
  const [nickname, setNickname] = useState(initNickname);
  const [positionId, setPositionId] = useState<PositionId | null>(
    () => position.positionId,
  );
  const [techStackIds, setTechStackIds] = useState<
    readonly TechStackValueType[]
  >(() => initTechStack.map((item) => item.techStackId));
  const [selfIntroduction, setSelfIntroduction] = useState(
    () => initIntroduction,
  );
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isCheckedNickname, setIsCheckedNickname] = useState(true);
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();

  const { mutate: updateUser } = useUpdateUserDetail({
    onSuccess: (res) => setSuccessSnackbar(res.message),
    onError: (res) => setErrorSnackbar(res.message),
  });

  const { mutate: deleteProfileImage } = useMutation({
    mutationFn: deleteProfileImageAPI,
    onSuccess: (data) => {
      const { result } = data;
      if (isEqual(result, 'success')) {
        updateUserInfo();
      }
    },
  });

  const updateUserInfo = () => {
    if (position) {
      const data = {
        nickname,
        positionId,
        techStackIds,
        intro: selfIntroduction,
        profileImgFile: selectedImage,
        isCheckedNickname,
      };

      try {
        updateUserDetailSchema.parse(data);
      } catch (e: unknown) {
        setErrorSnackbar((e as ZodError).errors[0].message);
        return;
      }

      updateUser(data);
    }
  };

  const saveProfile = () => {
    if (profileImgSrc && imageSrc === null) {
      deleteProfileImage();
    } else {
      updateUserInfo();
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setSelectedImage(file);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  const handleFileButtonClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const deleteImage = () => {
    setImageSrc(null);
    setSelectedImage(null);

    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setNickname(newName);
    if (isEqual(newName, nickname)) {
      setIsCheckedNickname(true);
    } else {
      setIsCheckedNickname(false);
    }
  };

  return (
    <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3'>
      <div className='w-full h-fit text-center'>
        <Avatar size='lg' src={imageSrc} alt='빈 프로필' />
      </div>
      <div className='text-center space-x-1'>
        <input
          ref={fileRef}
          type='file'
          accept='.png, .jpg, .jpeg, .gif'
          hidden
          onChange={handleImageChange}
        />
        <Button size='md' theme='primaryHollow' onClick={handleFileButtonClick}>
          {imageSrc === null ? '이미지 변경' : '변경'}
        </Button>
        <Button
          size='md'
          theme='primary'
          onClick={deleteImage}
          hidden={imageSrc === null}
        >
          삭제
        </Button>
      </div>
      <Input id='email' label='이메일' required disabled defaultValue={email} />
      <NicknameField
        value={nickname}
        defaultValue={initNickname}
        onChange={onChangeNickname}
        placeholder='영문, 숫자 포함 6자 이상'
        setCheck={setIsCheckedNickname}
        required
      />
      <PositionSelect positionId={positionId} setPosition={setPositionId} />
      <TechStackSelect techStacks={techStackIds} onChange={setTechStackIds} />
      <TextArea
        id='information'
        label='자기소개'
        placeholder='텍스트를 입력해주세요.'
        rows={3}
        cols={25}
        value={selfIntroduction}
        onChange={(e) => setSelfIntroduction(e.target.value)}
      />
      <FormButton onClick={saveProfile}>저장</FormButton>
    </div>
  );
}

export default UserProfileForm;
