import Skeleton from '@/shared/ui/Skeleton';

const CardListSkeleton = ({ itemCount = 8 }: { itemCount: number }) => {
  const items = new Array(itemCount).fill(null);
  return (
    <section className='mt-6 mobile:mt-2'>
      <ul className='grid justify-items-center pc:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 mt-8 gap-10 mobile:gap-5'>
        {items.length > 0 &&
          items.map((_, idx) => (
            <li
              key={idx}
              className='flex-col w-[280px] rounded-xl mobile:w-full mobile:mt-2'
            >
              <Skeleton sizeClassName='w-full h-[310px]' />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default CardListSkeleton;
