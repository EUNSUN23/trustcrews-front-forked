'use client';

import { useRecoilState } from 'recoil';
import { hasCookie } from 'cookies-next';
import useClientMount from '@/hooks/common/useClientMount';
import {
  activeBoardTabStore,
  BOARD_TABS,
} from '@/features/board/store/BoardActiveStateStore';

const BoardTab = () => {
  const [activeBoardTab, setActiveBoardTab] =
    useRecoilState(activeBoardTabStore);
  const mounted = useClientMount();

  const tabList =
    mounted && hasCookie('user_id')
      ? Object.values(BOARD_TABS)
      : [BOARD_TABS.PROJECT_POSTS];

  const selectedClass = 'border-b-2 border-black100 text-black100';
  const unselectedClass = 'text-greyUnselect';

  return (
    <div role='tablist' aria-label='게시판' className='flex border-b'>
      {tabList.map(({ text, name }) => (
        <div
          key={`tab-${name}`}
          role='tab'
          id={`tab-${name}`}
          aria-selected={activeBoardTab === name}
          aria-controls={`panel-${name}`}
          tabIndex={activeBoardTab === name ? 0 : -1}
          className={`p-5 font-bold text-2xl cursor-pointer mobile:text-xl ${
            activeBoardTab === name ? selectedClass : unselectedClass
          }`}
          onClick={() => setActiveBoardTab(name)}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default BoardTab;
