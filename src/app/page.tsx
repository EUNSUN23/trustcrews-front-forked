import Guide from '@/features/guide/contents/Guide';
import MainBoard from '@/widgets/MainBoard';
import InitialPostsDataProvider from '@/providers/data/InitialPostsDataProvider';
import ServerAuthStateProvider from '@/providers/ServerAuthStateProvider';

const RootPage = () => {
  return (
    <>
      <aside>
        <Guide />
      </aside>
      <main className='mt-10 mobile:mt-2'>
        <InitialPostsDataProvider>
          <ServerAuthStateProvider>
            {(authState) => <MainBoard serverAuthState={authState} />}
          </ServerAuthStateProvider>
        </InitialPostsDataProvider>
      </main>
    </>
  );
};

export default RootPage;
