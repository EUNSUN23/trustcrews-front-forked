'use client';

import { InputHTMLAttributes } from 'react';
import { useSetRecoilState } from 'recoil';
import { isEqual } from 'lodash';
import { classNames, isValidNickname } from '@/utils/common';
import { snackbarState } from '@/store/CommonStateStore';
import { checkNickname } from '@/features/user/service/checkNickName';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  setCheck: (value: boolean) => void;
}

function NicknameField({
  value,
  defaultValue,
  disabled = false,
  required = false,
  setCheck,
  ...props
}: InputProps) {
  const setSnackbar = useSetRecoilState(snackbarState);

  const checkDuplicateNickname = () => {
    if (value) {
      if (!isValidNickname(value as string)) {
        setSnackbar({
          show: true,
          type: 'ERROR',
          content: '닉네임은 영어 숫자 포함 6~10 자리만 가능합니다.',
        });
        return;
      }

      if (isEqual(value, defaultValue)) {
        setSnackbar({
          show: true,
          type: 'INFO',
          content: '현재 사용자의 닉네임 입니다.',
        });
      } else {
        checkNickname(value as string).then((response) => {
          const { message, result } = response;
          if (isEqual(result, 'success')) {
            setSnackbar({ show: true, type: 'SUCCESS', content: message });
            setCheck(true);
          } else {
            setSnackbar({ show: true, type: 'ERROR', content: message });
            setCheck(false);
          }
        });
      }
    } else {
      setSnackbar({
        show: true,
        type: 'ERROR',
        content: '닉네임을 입력해주세요.',
      });
    }
  };

  return (
    <div
      className={classNames(
        disabled ? 'opacity-50 pointer-events-none' : '',
        'relative mobile:text-sm',
      )}
    >
      <label htmlFor='nickname' className='text-gray-700'>
        닉네임
        {required ? (
          <span className='text-red-500 required-dot ml-1.5 align-middle'>
            *
          </span>
        ) : (
          <></>
        )}
      </label>
      <div className='flex'>
        <input
          id='nickname'
          type='text'
          value={value}
          className=' w-full py-2 px-4  flex-1  mobile:text-sm rounded-lg border-1 appearance-none border border-gray-300  bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
          {...props}
        />
        <button
          className={`rounded-lg ml-2 h-fit py-2 px-4 font-normal bg-primary text-white shadow-sm`}
          onClick={checkDuplicateNickname}
        >
          중복확인
        </button>
      </div>
    </div>
  );
}

export default NicknameField;
