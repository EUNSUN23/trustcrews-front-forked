import UserGuide from '@/features/userGuide';
import { Board } from '@/features/board';

function HomePage() {
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
}

export default HomePage;
