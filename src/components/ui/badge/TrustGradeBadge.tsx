'use client';

import { HTMLAttributes } from 'react';
import { BadgeProps } from '@/utils/type';
import { FaRegSmile } from '@react-icons/all-files/fa/FaRegSmile';
import { TrustGradeNameType } from '@/app/project/@setting/_utils/type';
import { classNames } from '@/utils/common';

interface TrustBradeBadgeProps extends BadgeProps, HTMLAttributes<SVGElement> {
  text: TrustGradeNameType;
  badgeStyle?: 'emo' | 'text';
}

function TrustGradeBadge({
  text,
  badgeStyle = 'emo',
  ...props
}: TrustBradeBadgeProps) {
  let textColor = '';

  switch (text) {
    case 'level1':
      textColor = 'text-level1';
      break;
    case 'level2':
      textColor = 'text-level2';
      break;
    case 'level3':
      textColor = 'text-level3';
      break;
    case 'level4':
      textColor = 'text-level4';
      break;
  }

  let badgeSize = 16;
  switch (props.size) {
    case 'md':
      badgeSize = 20;
      break;
    case 'lg':
      badgeSize = 24;
      break;
    default:
      break;
  }

  return (
    <>
      <span className='sr-only'>{`신뢰등급: ${text}`}</span>
      {badgeStyle === 'text' ? (
        <span
          className={classNames(
            `font-semibold ${textColor}`,
            props.className ? props.className : '',
          )}
        >
          {text}
        </span>
      ) : (
        <FaRegSmile
          aria-hidden={true}
          className={classNames(
            `${textColor}`,
            props.className ? props.className : '',
          )}
          size={badgeSize}
        />
      )}
    </>
  );
}

export default TrustGradeBadge;
