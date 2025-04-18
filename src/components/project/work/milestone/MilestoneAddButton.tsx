'use client';

import Button from '@/components/ui/button';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import {
  milestoneAddDataStateSelector,
  milestoneAddModalStateStore,
} from '@/store/project/task/MilestoneStateStore';
import { useSetRecoilState } from 'recoil';
import { useProjectManageAuth } from '@/lib/getProjectManageAuth';

function MilestoneAddButton({
  projectId,
}: {
  projectId: string;
  userId: string;
}) {
  const {
    data: { data: currentUserPMAuth },
  } = useProjectManageAuth(projectId);
  const setMilestoneAddModalState = useSetRecoilState(
    milestoneAddModalStateStore,
  );
  const setMilestoneAddDataProjectId = useSetRecoilState(
    milestoneAddDataStateSelector('projectId'),
  );
  const setMilestoneAddDataAuthMap = useSetRecoilState(
    milestoneAddDataStateSelector('authMap'),
  );

  // if (isFetchingCurrentUserPMAuth) return <MilestoneAddButtonSkeleton />;

  const onClickHandler = () => {
    setMilestoneAddModalState((prev) => ({ ...prev, isOpen: true }));
    setMilestoneAddDataProjectId(projectId);
    setMilestoneAddDataAuthMap(currentUserPMAuth.code);
  };

  return (
    <Button
      size='md'
      className='mb-4'
      onClickHandler={onClickHandler}
      aria-label='마일스톤 추가'
    >
      <span className='flex items-center'>
        <FaPlus className='tablet:w-3 tablet:h-3 mr-2' />
        마일스톤 추가
      </span>
    </Button>
  );
}

export default MilestoneAddButton;
