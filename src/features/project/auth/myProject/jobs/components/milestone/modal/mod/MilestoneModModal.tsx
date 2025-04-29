'use client';

import { useRecoilValue, useResetRecoilState } from 'recoil';
import Modal from '@/components/ui/Modal';
import { createPortal } from 'react-dom';
import MilestoneModContent from '@/features/project/auth/myProject/jobs/components/milestone/modal/mod/MilestoneModContent';
import MilestoneModDate from '@/features/project/auth/myProject/jobs/components/milestone/modal/mod/MilestoneModDate';
import {
  updateMilestoneSchema,
  useUpdateMilestone,
} from '@/features/project/auth/myProject/jobs/service/milestone/updateMilestone';
import useSnackbar from '@/hooks/common/useSnackbar';
import { ZodError } from 'zod';
import {
  milestoneModDataStateStore,
  milestoneModModalStateStore,
} from '@/features/project/auth/myProject/jobs/store/MilestoneModalStateStore';
import { activeMilestoneStateStore } from '@/features/project/auth/myProject/jobs/store/ActiveMilestoneStateStore';
import { projectManageAuthStateStore } from '@/features/project/auth/myProject/global/store/ProjectManageAuthStateStore';
import useModalPortalElement from '@/hooks/common/useModalPortalElement';
import { numStrToBigInt } from '@/utils/common';

const MilestoneModModal = () => {
  const { isOpen, title } = useRecoilValue(milestoneModModalStateStore);
  const [portalElement] = useModalPortalElement(isOpen);

  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();

  const resetMilestoneModModalState = useResetRecoilState(
    milestoneModModalStateStore,
  );
  const resetMilestoneModData = useResetRecoilState(milestoneModDataStateStore);
  const resetActiveMilestone = useResetRecoilState(activeMilestoneStateStore);

  const { milestoneId, content, startDate, endDate, updateDate } =
    useRecoilValue(milestoneModDataStateStore);
  const { code: authCode } = useRecoilValue(projectManageAuthStateStore);

  const { mutate: updateMilestone, isPending: isUpdating } = useUpdateMilestone(
    numStrToBigInt(milestoneId),
    authCode,
    {
      onSuccess: (res) => {
        setSuccessSnackbar(res.message);
        resetMilestoneModModalState();
        resetMilestoneModData();
        resetActiveMilestone();
      },
      onError: (res) => setErrorSnackbar(res.message),
    },
  );

  const handleClickCloseButton = () => {
    resetMilestoneModData();
    resetMilestoneModModalState();
  };

  const handleClickConfirmButton = () => {
    const data = { content, startDate, endDate };
    try {
      updateMilestoneSchema.parse(data);
    } catch (e: unknown) {
      setErrorSnackbar((e as ZodError).errors[0].message);
      return;
    }
    updateMilestone(data);
  };

  return (
    <>
      {isOpen && portalElement
        ? createPortal(
            <Modal
              isOpen={isOpen}
              close={handleClickCloseButton}
              title={title}
              isUpdating={isUpdating}
              onClickConfirmHandler={handleClickConfirmButton}
            >
              <section className='tablet:w-[450px] mobile:w-[280px] max-h-[500px] mb-4 flex-col mt-5'>
                <div className='space-y-5 mobile:space-y-3 mx-4 mobile:mx-0 mobile:text-sm'>
                  <MilestoneModContent />
                  <MilestoneModDate />
                  <div className='max-w-[360px] flex'>
                    <label className='text-gray-700 font-semibold self-center'>
                      업데이트
                    </label>
                    <div className='min-w-[280px] h-[42px] mobile:h-[38px] flex space-x-3 ml-auto'>
                      <div className=' pl-2 text-left self-center'>
                        {updateDate}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Modal>,
            portalElement as Element,
          )
        : null}
    </>
  );
};

export default MilestoneModModal;
