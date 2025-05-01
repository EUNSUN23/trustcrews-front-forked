import { BsChevronDown } from '@react-icons/all-files/bs/BsChevronDown';

export const PositionFilterSkeleton = () => {
  return (
    <div className='relative z-10 self-center'>
      <div className='px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer bg-gray-300 animate-pulse'>
        <div className='text-base text-grey800 mobile:text-sm'>{'포지션'}</div>
        <BsChevronDown className='w-4 h-4 text-grey800' />
      </div>
    </div>
  );
};
