'use client';

import { ChangeEvent, useRef, useState } from 'react';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/form/Input';
import NicknameField from '@/components/ui/form/NickNameField';
import TextArea from '@/components/ui/form/TextArea';
import FormButton from '@/components/ui/form/FormButton';
import { PositionId, ProfileInfo, TechStackValueType } from '@/utils/type';
import { changeImageUrl, isValidNickname } from '@/utils/common';
import {
  deleteProfileImage as deleteProfileImageAPI,
  updateUser as updateUserAPI,
  UpdateUserInfo,
} from '@/service/user/user';
import { useSetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import { snackbarState } from '@/store/CommonStateStore';
import PositionSelect from '@/components/user/signup/PositionSelect';
import TechStackSelect from '@/components/ui/form/TechStackSelect';

function ProfileForm({ profileInfo }: { profileInfo: ProfileInfo }) {
  const {
    position,
    profileImgSrc,
    nickname: initNickname,
    techStacks: initTechStack,
    intro: initIntroduction,
    email,
  } = profileInfo;

  const [imageSrc, setImageSrc] = useState<string | null>(() =>
    changeImageUrl(profileImgSrc),
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
  const setSnackbar = useSetRecoilState(snackbarState);

  const queryClient = useQueryClient();

  const { mutate: updateUser } = useMutation({
    mutationFn: (updateData: UpdateUserInfo) =>
      updateUserAPI(updateData, selectedImage),
    onSuccess: (data) => {
      const { message, result } = data;
      if (isEqual(result, 'success')) {
        setSnackbar({ show: true, type: 'SUCCESS', content: message });
        queryClient.invalidateQueries({ queryKey: ['profileInfo'] });
        queryClient.invalidateQueries({ queryKey: ['simpleUserInfo'] });
        queryClient.invalidateQueries({ queryKey: ['postList'] });
      } else {
        setSnackbar({
          show: true,
          type: 'ERROR',
          content: '프로세스 수행중 에러가 발생했습니다.',
        });
      }
    },
    onError: (err) => {
      console.log('err', err);
      setSnackbar({
        show: true,
        type: 'ERROR',
        content: '프로세스 수행중 에러가 발생했습니다.',
      });
    },
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

  const isValid = () => {
    if (nickname === '') {
      setSnackbar({
        show: true,
        type: 'ERROR',
        content: '닉네임을 입력해주세요.',
      });
      return false;
    }

    // 닉네임 형식이 맞지 않는 경우
    if (!isValidNickname(nickname)) {
      setSnackbar({
        show: true,
        type: 'ERROR',
        content: '닉네임은 영어 숫자 포함 6~10 자리만 가능합니다.',
      });
      return false;
    }

    // 닉네임 중복 확인 하지 않았을 경우
    if (!isCheckedNickname) {
      setSnackbar({
        show: true,
        type: 'ERROR',
        content: '닉네임 중복확인을 해주세요.',
      });
      return false;
    }

    if (!position) {
      setSnackbar({
        show: true,
        type: 'ERROR',
        content: '직무를 선택해주세요.',
      });
      return false;
    }

    if (techStackIds.length === 0) {
      setSnackbar({
        show: true,
        type: 'ERROR',
        content: '관심 스택을 선택해주세요.',
      });
      return false;
    }

    return true;
  };

  const updateUserInfo = () => {
    if (position) {
      const updateData = {
        nickname,
        positionId,
        techStackIds,
        intro: selfIntroduction,
      } as UpdateUserInfo;
      updateUser(updateData);
    }
  };

  const saveProfile = () => {
    if (!isValid()) {
      return;
    }

    if (profileImgSrc && imageSrc === null) {
      // 기존 프로필 이미지 삭제 시, s3 에서 삭제 후 사용자 정보 업데이트
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
        <Button
          size='md'
          theme='primary-hollow'
          onClickHandler={handleFileButtonClick}
        >
          {imageSrc === null ? '이미지 변경' : '변경'}
        </Button>
        <Button
          size='md'
          theme='primary'
          onClickHandler={deleteImage}
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
      <TechStackSelect
        techStacks={techStackIds}
        setTechStacks={setTechStackIds}
      />
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

export default ProfileForm;
