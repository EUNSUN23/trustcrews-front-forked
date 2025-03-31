import { PositionItem } from '@/utils/type';
import { classNames } from '@/utils/common';

interface PositionDropDownListProps {
  positionItems: PositionItem[];
  onChangeValue: (value: PositionItem | null) => void;
  direction?: 'up' | 'down';
}

const defaultItem: PositionItem = {
  positionId: BigInt(0),
  positionName: '선택',
};

function PositionDropdownList({
  positionItems,
  onChangeValue,
  direction = 'down',
}: PositionDropDownListProps) {
  const selectItems = [defaultItem, ...positionItems];

  return (
    <div
      className={classNames(
        'absolute',
        direction === 'up' ? 'bottom-12' : 'top-12',
      )}
    >
      <div className='p-2 flex flex-col w-[150px] h-[auto] mobile:w-[130px] mobile:h-[auto]  border-2 rounded-3xl bg-white'>
        {selectItems.map((position) => (
          <div
            key={position.positionId.toString()}
            className='p-2 text-lg mobile:text-sm font-bold text-grey900 cursor-pointer'
            onClick={() =>
              onChangeValue(position.positionId === BigInt(0) ? null : position)
            }
          >
            {position.positionName}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PositionDropdownList;
