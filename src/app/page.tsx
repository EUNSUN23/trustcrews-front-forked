import UserGuide from '@/features/userGuide';
import { Board } from '@/features/board';

const RootPage = () => {
  return (
    <>
      <aside>
        <UserGuide />
      </aside>
      <main className='mt-10 mobile:mt-2'>
        <Board />
      </main>
    </>
  );
};

export default RootPage;
