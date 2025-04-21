'use client';

import { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import Modal from '@/components/ui/Modal';
import { createPortal } from 'react-dom';
import MilestoneAddDate from '@/features/project/auth/myProject/jobs/components/milestone/modal/add/MilestoneAddDate';
import MilestoneAddContent from '@/features/project/auth/myProject/jobs/components/milestone/modal/add/MilestoneAddContent';
import {
  createMilestoneInputSchema,
  useCreateMilestone,
} from '@/features/project/auth/myProject/jobs/service/milestone/createMilestone';
import {
  milestoneAddDataStateStore,
  milestoneAddModalStateStore,
} from '@/features/project/auth/myProject/jobs/store/MilestoneModalStateStore';
import useSnackbar from '@/hooks/common/useSnackbar';
import { numStrToBigInt } from '@/utils/common';
import { activeMilestoneStateStore } from '@/features/project/auth/myProject/jobs/store/ActiveMilestoneStateStore';
import { ZodError } from 'zod';
import { projectIdState } from '@/features/project/auth/myProject/global/store/ProjectIdStateStore';
import { projectManageAuthStateStore } from '@/features/project/auth/myProject/global/store/ProjectManageAuthStateStore';

const MilestoneAddModal = () => {
  const { isOpen, title } = useRecoilValue(milestoneAddModalStateStore);
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById('modal'));

    if (!isOpen) {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflowY = 'auto';

      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isOpen]);

  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();

  const resetMilestoneAddModalState = useResetRecoilState(
    milestoneAddModalStateStore,
  );
  const resetMilestoneAddData = useResetRecoilState(milestoneAddDataStateStore);
  const resetActiveMilestone = useResetRecoilState(activeMilestoneStateStore);

  const projectId = useRecoilValue(projectIdState);
  const { code: authCode } = useRecoilValue(projectManageAuthStateStore);
  const milestoneAddData = useRecoilValue(milestoneAddDataStateStore);

  const { mutate: createMilestone, isPending: isCreating } = useCreateMilestone(
    numStrToBigInt(projectId),
    authCode,
    {
      onSuccess: (res) => {
        setSuccessSnackbar(res.message);
        resetMilestoneAddModalState();
        resetMilestoneAddData();
        resetActiveMilestone();
      },
      onError: (res) => setErrorSnackbar(res.message),
    },
  );

  const handleClickCloseButton = () => {
    resetMilestoneAddModalState();
    resetMilestoneAddData();
  };

  const handleClickConfirmButton = () => {
    try {
      createMilestoneInputSchema.parse(milestoneAddData);
    } catch (e: unknown) {
      setErrorSnackbar((e as ZodError).errors[0].message);
      return;
    }
    createMilestone(milestoneAddData);
  };

  return (
    <>
      {isOpen && portalElement
        ? createPortal(
            <Modal
              isOpen={isOpen}
              close={handleClickCloseButton}
              title={title}
              isUpdating={isCreating}
              onClickConfirmHandler={handleClickConfirmButton}
            >
              <section className='tablet:w-[450px] mobile:w-[280px] max-h-[500px] mb-4 flex-col mt-5'>
                <div className='space-y-5 mobile:space-y-3 mx-4 mobile:mx-0 mobile:text-sm'>
                  <MilestoneAddContent />
                  <MilestoneAddDate />
                </div>
              </section>
            </Modal>,
            portalElement,
          )
        : null}
    </>
  );
};

export default MilestoneAddModal;
