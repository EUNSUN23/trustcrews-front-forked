import BoardTab from '@/features/board/BoardTab';
import InitialPostsDataProvider from '@/app/InitialPostsDataProvider';
import BoardTabPanel from '@/features/board/BoardTabPanel';

export function Board() {
  return (
    <>
      <BoardTab />
      <InitialPostsDataProvider>
        <BoardTabPanel />
      </InitialPostsDataProvider>
    </>
  );
}
