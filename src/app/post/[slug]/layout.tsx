import { Metadata } from 'next';
import {
  getPostPublicInfo,
  PostPublicInfoData,
} from '@/service/post/public/getPostPublicInfo';
import ConfirmModal from '@/ui/ConfirmModal';
import { ReactNode } from 'react';
import Nav from '@/shared/ui/Nav';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { ResponseBody } from '@/types/responseBody';

export async function generateMetadata({
  params: { slug: postId },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data: ResponseBody<PostPublicInfoData> = await getPostPublicInfo(
    numStrToBigInt(postId),
  );

  return {
    title: `${data.data.title} - 팀프로젝트 | TRUSTCREWS`,
    description: `${data.data.content}`,
  };
}

type PostDetailLayoutProps = {
  children: ReactNode;
};
export default function PostDetailLayout({ children }: PostDetailLayoutProps) {
  return (
    <div className='w-full h-full flex flex-col justify-center mx-auto tablet:pt-[1.5rem] px-[2rem] tablet:px-[3rem] mobile:px-[0.5rem] pb-[1rem]'>
      <nav className='w-fit pc:h-[100px] h-[60px] flex flex-col justify-center cursor-pointer'>
        <Nav to='/' />
      </nav>
      {children}
      <ConfirmModal />
    </div>
  );
}
