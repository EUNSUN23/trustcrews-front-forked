'use client';

import { useRecoilValue } from 'recoil';
import { projectNoticeActiveMenuStateStore } from '@/store/project/alert/AlertNavTabStateStore';
import VAlertRecruitList from '@/components/project/alert/vote/recruit/list/VAlertRecruitList';
import VAlertFWList from '@/components/project/alert/vote/fwithdraw/list/VAlertFWList';
import VAlertFwModal from '@/components/project/alert/vote/fwithdraw/modal/VAlertFWModal';
import VAlertRecruitModal from '@/components/project/alert/vote/recruit/modal/VAlertRecruitModal';
import AlertCrewList from '@/components/project/alert/crew/list/AlertCrewList';

function NoticePage() {
  const activeNoticeMenu = useRecoilValue(projectNoticeActiveMenuStateStore);

  return (
    <section className='mb-20 tablet:basis-4/5'>
      {activeNoticeMenu.name === '모집' && <VAlertRecruitList />}
      {activeNoticeMenu.name === '강제탈퇴' && <VAlertFWList />}
      {activeNoticeMenu.name === '크루' && <AlertCrewList />}
      <VAlertFwModal />
      <VAlertRecruitModal />
    </section>
  );
}

export default NoticePage;
