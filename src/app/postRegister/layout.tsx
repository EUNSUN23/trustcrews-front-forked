import HomeNav from '@/components/ui/HomeNav';

function PostRegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full h-full flex flex-col justify-center mx-auto tablet:pt-[1.5rem] px-[2rem] tablet:px-[3rem] mobile:px-[0.5rem] pb-[1rem]'>
      <nav className='w-fit pc:h-[100px] h-[60px] flex flex-col justify-center cursor-pointer'>
        <HomeNav to='/' />
      </nav>
      {children}
    </div>
  );
}

export default PostRegisterLayout;
