import Guide from '@/contents/Guide';
import MainBoard from '@/contents/MainBoard';
import InitialPostsDataProvider from '@/app/InitialPostsDataProvider';

const RootPage = () => {
  return (
    <>
      <aside>
        <Guide />
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
