'use client';

import { ChangeEvent, useState } from 'react';
import { VoteOption } from '@/service/project/vote/constant';

type VoteBarProps = {
  group: string;
  label: string;
  counts: number;
  maxCounts: number;
  disabled: boolean;
  onChangeVoteHandler: (value: string) => void;
  value: string;
};

const barColorVariants = {
  green: 'bg-green-500',
  green_disabled: 'bg-green-500/30',
  red: 'bg-red-500',
  red_disabled: 'bg-red-500/30',
};

function VoteBar({
  group,
  label,
  counts,
  maxCounts,
  onChangeVoteHandler,
  disabled,
  value,
}: VoteBarProps) {
  const [checked, setChecked] = useState(false);

  const barBackgroundColorColor = disabled
    ? 'bg-gray-400/40'
    : 'bg-gray-400/80';
  const barWidth = counts > 0 ? Math.floor((counts / maxCounts) * 100) : 0;
  const barColor = disabled
    ? value === VoteOption.VODA1001.code
      ? barColorVariants.green_disabled
      : barColorVariants.red_disabled
    : value === VoteOption.VODA1001.code
      ? barColorVariants.green
      : barColorVariants.red;

  const onChangeCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (confirm('투표하시겠습니까?')) {
      onChangeVoteHandler(e.target.value);
    } else {
      setChecked(false);
      e.target.blur();
    }
  };

  return (
    <div className='flex mobile:flex-col justify-center items-center mobile:items-start'>
      <div className='text-nowrap tablet:basis-[50px] text-[18px] mobile:text-base text-greyDarkblue font-medium'>
        {label}
      </div>
      <div className='flex w-full justify-around items-center space-x-12 mobile:space-x-9'>
        <div
          className={`relative tablet:basis-[70%] mobile:w-full h-2 ${barBackgroundColorColor} rounded-full`}
        >
          <div
            style={{ width: `${barWidth}%` }}
            className={`${barColor} h-full text-center text-xs text-white rounded-full`}
          ></div>
          <span className='absolute top-[-7px] left-[102%] mobile:text-sm text-greyBlue font-medium'>{`${counts}/${maxCounts}`}</span>
        </div>
        <div className='flex space-x-2 h-5 items-center'>
          <input
            type='radio'
            name={group}
            onChange={onChangeCheckedHandler}
            value={value}
            checked={checked}
            className='self-stretch border-gray-400 text-indigo-600 focus:ring-none'
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}

export default VoteBar;
