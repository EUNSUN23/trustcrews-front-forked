import UserGuide from '@/features/userGuide';
import MainBoard from '@/contents/MainBoard';
import InitialPostsDataProvider from '@/app/InitialPostsDataProvider';

const RootPage = () => {
  return (
    <>
      <aside>
        <UserGuide />
      </aside>
      <main className='mt-10 mobile:mt-2'>
        <InitialPostsDataProvider>
          <MainBoard />
        </InitialPostsDataProvider>
      </main>
    </>
  );
};

export default RootPage;
