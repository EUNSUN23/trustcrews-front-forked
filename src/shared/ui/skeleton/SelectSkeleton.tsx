import Select from '@/shared/ui/Select';
import { HTMLAttributes } from 'react';

interface SelectSkeletonProps extends HTMLAttributes<HTMLElement> {
  label: string;
  placeholder?: string;
  required?: boolean;
}

const SelectSkeleton = ({
  label,
  placeholder = '',
  required,
  ...props
}: SelectSkeletonProps) => {
  return (
    <div className={props.className ? props.className : ''}>
      <Select
        value={{ name: '불러오는 중..', value: '' }}
        setValue={() => {}}
        items={[]}
        label={label}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default SelectSkeleton;
