'use client';

import { HTMLAttributes } from 'react';
import { FaRegSmile } from '@react-icons/all-files/fa/FaRegSmile';
import { TrustGradeNameType } from '@/app/project/@setting/_utils/type';
import { clsx } from 'clsx';
import { BadgeVariants } from '@/utils/badge';
import { VariantProps } from 'class-variance-authority';
import cn from '@/utils/cn';

const trustGradeBadgeColorClass = (trustGrade: TrustGradeNameType) =>
  clsx({
    'text-level1': trustGrade === 'level1',
    'text-level2': trustGrade === 'level2',
    'text-level3': trustGrade === 'level3',
    'text-level4': trustGrade === 'level4',
  });

const TrustGradeBadgeVariants = (trustGrade: TrustGradeNameType) =>
  BadgeVariants(`font-semibold`, trustGradeBadgeColorClass(trustGrade));

interface TrustBradeBadgeProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<ReturnType<typeof TrustGradeBadgeVariants>> {
  trustGrade: TrustGradeNameType;
  badgeStyle?: 'emo' | 'text';
}

function TrustGradeBadge({
  trustGrade,
  size,
  badgeStyle = 'emo',
  ...props
}: TrustBradeBadgeProps) {
  let emoBadgeSize = 16;
  switch (size) {
    case 'md':
      emoBadgeSize = 20;
      break;
    case 'lg':
      emoBadgeSize = 24;
      break;
    default:
      break;
  }

  return (
    <>
      <span className='sr-only'>{`신뢰등급: ${trustGrade}`}</span>
      {badgeStyle === 'text' ? (
        <span
          {...props}
          className={cn(
            TrustGradeBadgeVariants(trustGrade)({ size }),
            props.className,
          )}
        >
          {trustGrade}
        </span>
      ) : (
        <FaRegSmile
          aria-hidden={true}
          className={cn(trustGradeBadgeColorClass(trustGrade), props.className)}
          size={emoBadgeSize}
        />
      )}
    </>
  );
}

export default TrustGradeBadge;
