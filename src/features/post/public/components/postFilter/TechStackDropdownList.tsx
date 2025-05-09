import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import { useRecoilState } from 'recoil';
import TechStackImage from '@/components/TechStackImage';
import { selectedTechStackState } from '@/features/post/public/store/PostSearchStateStore';
import { TechStackCategory } from '@/service/techStack/public/getTechStackCategories';
import { TechStackMapping } from '@/service/techStack/public/getTechStackMappings';

interface TechStackDropdownListProps {
  categories: TechStackCategory[];
  items: TechStackMapping[];
}

const TechStackDropdownList = ({
  categories,
  items,
}: TechStackDropdownListProps) => {
  const [selectedCategory, setSelectedCategory] = useState<TechStackCategory>(
    categories[0],
  );
  const [selectedTechStacks, setSelectedTechStacks] = useRecoilState(
    selectedTechStackState,
  );
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ maxWidth: 700 });

  const getCategories = () => {
    const all = {
      techStackCategoryId: BigInt(0),
      techStackCategoryName: '모두보기',
    };
    return [...categories, all];
  };

  const filteredTechStacks = items.filter((stack) => {
    const categoryName = selectedCategory.techStackCategoryName;
    if (categoryName === '모두보기' || isMobile) {
      return true;
    }

    const { categories } = stack;
    if (Array.isArray(categories)) {
      return categories.includes(categoryName);
    }

    return false;
  });

  const handleInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleCategory = (category: TechStackCategory) => {
    setSelectedCategory(category);
  };

  const handleTechStackClick = (stack: TechStackMapping) => {
    setSelectedTechStacks((prevSelected) => {
      if (prevSelected.includes(stack)) {
        return prevSelected.filter((prevStack) => prevStack !== stack);
      } else {
        return [...prevSelected, stack];
      }
    });
  };

  const handleTechStackRemove = (stack: TechStackMapping) => {
    setSelectedTechStacks((prevSelected) =>
      prevSelected.filter((prevStack) => prevStack !== stack),
    );
  };

  const resetSelection = () => {
    setSelectedTechStacks([]);
  };

  useEffect(() => {
    setIsMobile(mobile);
  }, [mobile, isMobile]);

  return (
    <div className='absolute top-12' onClick={handleInnerClick}>
      <div className='py-3 px-5 flex flex-col w-[700px] mobile:w-[340px] border-2 rounded-3xl bg-white'>
        <ul
          role='tablist'
          className='flex text-xl font-bold gap-6 border-b-2 mobile:hidden'
        >
          {getCategories().map((category) => {
            const { techStackCategoryId: id, techStackCategoryName: name } =
              category;
            const isActive = name === selectedCategory.techStackCategoryName;
            return (
              <li
                key={id.toString()}
                role='tab'
                aria-selected={isActive}
                aria-controls={`techStack-panel-${id}`}
                onClick={() => handleCategory(category)}
                className={`cursor-pointer ${isActive ? 'text-black100 border-b-2 border-black100 pb-4' : 'text-grey800'}`}
              >
                {name}
              </li>
            );
          })}
        </ul>
        <ul
          role='tabpanel'
          id={`techStack-panel-${selectedCategory.techStackCategoryId}`}
          className='flex mt-4 gap-2 flex-wrap'
        >
          {filteredTechStacks.map((stack) => {
            const { techStackId, techStackName } = stack;
            const isActive =
              selectedTechStacks.length === 0 ||
              selectedTechStacks.includes(stack);
            return (
              <li
                key={techStackId.toString()}
                role='checkbox'
                aria-checked={isActive}
                onClick={() => handleTechStackClick(stack)}
                className={`flex gap-2 items-center justify-center border-[1px] rounded-3xl py-1 px-2 border-grey400 cursor-pointer ${
                  isActive ? 'opacity-1' : 'opacity-30'
                }`}
              >
                <div className='mobile:hidden'>
                  <TechStackImage
                    stackName={techStackName}
                    width={30}
                    height={30}
                  />
                </div>
                <span className='text-base'>{techStackName}</span>
              </li>
            );
          })}
        </ul>
        <div aria-live='polite'>
          <ul className='flex mt-6 flex-wrap gap-y-1 mobile:hidden'>
            {items.map((stack) => {
              const { techStackId, techStackName } = stack;
              const isActive = selectedTechStacks.includes(stack);
              return (
                <li
                  key={techStackId.toString()}
                  className={`flex gap-2 items-center justify-center py-1 px-2 cursor-pointer ${isActive ? '' : 'hidden'}`}
                  onClick={() => handleTechStackRemove(stack)}
                >
                  {stack && (
                    <div className='flex gap-1 bg-grey300 rounded-xl py-1 px-2'>
                      <span className='text-xs self-center'>
                        {techStackName}
                      </span>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_URL}/images/delete.svg`}
                        alt={techStackName}
                        width={18}
                        height={18}
                      />
                    </div>
                  )}
                </li>
              );
            })}
            {selectedTechStacks.length > 0 && (
              <div
                onClick={resetSelection}
                className='flex items-center gap-1 ml-2 cursor-pointer'
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_URL}/images/initialize.svg`}
                  alt='initialize'
                  width={15}
                  height={15}
                />
                <span className='text-base'>초기화</span>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TechStackDropdownList;
