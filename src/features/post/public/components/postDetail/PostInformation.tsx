import PositionBadge from '@/components/badge/PositionBadge';
import { PostPublicInfoData } from '@/features/post/public/service/getPostPublicInfo';

interface InfoProps {
  postInfo: PostPublicInfoData;
}

const PostInformation = ({ postInfo }: InfoProps) => {
  const { boardPositions, contact } = postInfo;

  return (
    <article className='grid grid-cols-2 gap-y-8 mobile:gap-y-0 mobile:grid-cols-1 mobile:text-sm'>
      <h2 className='sr-only'>게시글 정보</h2>
      <div
        role='group'
        aria-label='연락 방법'
        className='flex gap-5 min-h-10 items-center'
      >
        <h3 className='text-grey800 w-[110px] mobile:w-[80px] text-xl mobile:text-sm whitespace-nowrap font-bold'>
          연락 방법
        </h3>
        <p className='w-[calc(100%-130px)] line-clamp-1'>{contact}</p>
      </div>
      <div
        role='group'
        aria-label='모집 분야'
        className='flex gap-5 min-h-10 items-center'
      >
        <h3 className='text-grey800 w-[110px] mobile:w-[80px] text-xl mobile:text-sm whitespace-nowrap font-bold'>
          모집 분야
        </h3>
        <ul className='flex w-[calc(100%-130px)] gap-1 items-center overflow-auto'>
          {boardPositions.length > 0 &&
            boardPositions.map((boardPosition) => {
              const { positionId, name } = boardPosition.position;
              return (
                <PositionBadge
                  key={positionId.toString()}
                  size='xs'
                  text={name}
                />
              );
            })}
        </ul>
      </div>
    </article>
  );
};

export default PostInformation;
