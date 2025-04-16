import { Metadata } from 'next';
import { PostPublicInfoData, ResponseBody } from '@/utils/type';
import { getPostPublicInfo } from '@/features/post/service/getPostPublicInfo';
import { numStrToBigInt } from '@/utils/common';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { ReactNode } from 'react';
import HomeNav from '@/components/ui/HomeNav';

export async function generateMetadata({
  params: { slug: postId },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data: ResponseBody<PostPublicInfoData> = await getPostPublicInfo(
    numStrToBigInt(postId),
  );

  return {
    title: `${data!.data!.title} - 팀프로젝트 | TRUSTCREWS`,
    description: `${data!.data!.content}`,
  };
}

type PostDetailLayoutProps = {
  children: ReactNode;
};
export default function PostDetailLayout({ children }: PostDetailLayoutProps) {
  return (
    <div className='w-full h-full flex flex-col justify-center mx-auto tablet:pt-[1.5rem] px-[2rem] tablet:px-[3rem] mobile:px-[0.5rem] pb-[1rem]'>
      <nav className='w-fit pc:h-[100px] h-[60px] flex flex-col justify-center cursor-pointer'>
        <HomeNav to='/' />
      </nav>
      {children}
      <ConfirmModal />
    </div>
  );
}
