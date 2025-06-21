import Guide from '@/features/guide/components/Guide';
import MainBoard from '@/layouts/MainBoard';
import AuthStateProvider from '@/providers/AuthStateProvider';

const RootPage = () => {
  return (
    <>
      <aside>
        <Guide />
      </aside>
      <main className='mt-10 mobile:mt-2'>
        <AuthStateProvider>
          {(authState) => <MainBoard serverAuthState={authState} />}
        </AuthStateProvider>
      </main>
    </>
  );
};

export default RootPage;
