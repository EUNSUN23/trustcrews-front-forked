'use client';

import Avatar from '@/shared/ui/Avatar';
import { PostPublicInfoData } from '@/service/post/public/getPostPublicInfo';

type PostTitleProps = { postInfo: PostPublicInfoData };

const PostTitle = ({ postInfo }: PostTitleProps) => {
  const { title, createDate, user } = postInfo;

  return (
    <section className='h-[130px] mobile:h-[100px] flex flex-col justify-center mt-5 mb-5 mobile:mt-0 space-y-6 mobile:space-y-3 border-b-2'>
      <h1 className='text-black100 font-bold text-4xl mobile:text-2xl break-words'>
        {title}
      </h1>
      <article className='flex gap-3 items-center'>
        <div className='flex items-center gap-2'>
          <Avatar size='xxs' alt={user.nickName} src={user.userProfileImgSrc} />
          <div className='text-lg mobile:text-base'>
            <span className='sr-only'>작성자: </span>
            {user.nickName}
          </div>
        </div>
        <div aria-hidden={true}>|</div>
        <div className='text-lg mobile:text-base'>
          <span className='sr-only'>작성 날짜: </span>
          <time dateTime={createDate}>{createDate}</time>
        </div>
      </article>
    </section>
  );
};

export default PostTitle;
