'use client';

import { useRecoilValue, useResetRecoilState } from 'recoil';
import Modal from '@/shared/ui/Modal';
import { createPortal } from 'react-dom';
import MilestoneModContentControl from '@/features/projectJobs/private/components/milestone/form/MilestoneModContentControl';
import MilestoneModDateControl from '@/features/projectJobs/private/components/milestone/form/MilestoneModDateControl';
import {
  updateMilestoneSchema,
  useUpdateMilestone,
} from '@/features/projectJobs/private/service/milestone/updateMilestone';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { ZodError } from 'zod';
import {
  milestoneModFormStateStore,
  milestoneModModalStateStore,
} from '@/features/projectJobs/private/store/MilestoneModalStateStore';
import { activeMilestoneStateStore } from '@/features/projectJobs/private/store/ActiveMilestoneStateStore';
import { projectManageAuthStateStore } from '@/features/projectConfig/private/store/ProjectManageAuthStateStore';
import useModalPortalElement from '@/shared/hooks/useModalPortalElement';
import { numStrToBigInt } from '@/shared/utils/stringUtils';

const MilestoneModModal = () => {
  const { isOpen, title, milestoneId, updateDate } = useRecoilValue(
    milestoneModModalStateStore,
  );
  const [portalElement] = useModalPortalElement(isOpen);

  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();

  const resetMilestoneModModalState = useResetRecoilState(
    milestoneModModalStateStore,
  );
  const resetMilestoneModData = useResetRecoilState(milestoneModFormStateStore);
  const resetActiveMilestone = useResetRecoilState(activeMilestoneStateStore);

  const { content, startDate, endDate } = useRecoilValue(
    milestoneModFormStateStore,
  );
  const { code: userPMAuth } = useRecoilValue(projectManageAuthStateStore);

  const { mutate: updateMilestone, isPending: isUpdating } = useUpdateMilestone(
    numStrToBigInt(milestoneId),
    userPMAuth,
    {
      onSuccess: (res) => {
        setSuccessSnackbar(res.message);
        resetMilestoneModModalState();
        resetMilestoneModData();
        resetActiveMilestone();
      },
      onError: (error) => setErrorSnackbar(error.message),
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
                  <MilestoneModContentControl />
                  <MilestoneModDateControl />
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
