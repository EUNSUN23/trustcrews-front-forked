'use client';

import { useRecoilValue, useResetRecoilState } from 'recoil';
import Modal from '@/shared/ui/Modal';
import { createPortal } from 'react-dom';
import MilestoneDateControl from '@/features/projectJobs/private/components/milestone/form/MilestoneDateControl';
import MilestoneContentControl from '@/features/projectJobs/private/components/milestone/form/MilestoneContentControl';
import {
  createMilestoneInputSchema,
  useCreateMilestone,
} from '@/features/projectJobs/private/service/milestone/createMilestone';
import {
  milestoneAddFormStateStore,
  milestoneAddModalStateStore,
} from '@/features/projectJobs/private/store/MilestoneModalStateStore';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { activeMilestoneStateStore } from '@/features/projectJobs/private/store/ActiveMilestoneStateStore';
import { ZodError } from 'zod';
import { projectIdState } from '@/features/project/private/store/myProject/ProjectIdStateStore';
import { projectManageAuthStateStore } from '@/features/projectConfig/private/store/ProjectManageAuthStateStore';
import useModalPortalElement from '@/shared/hooks/useModalPortalElement';
import { numStrToBigInt } from '@/shared/utils/stringUtils';

const MilestoneAddModal = () => {
  const { isOpen, title } = useRecoilValue(milestoneAddModalStateStore);
  const [portalElement] = useModalPortalElement(isOpen);

  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();

  const resetMilestoneAddModalState = useResetRecoilState(
    milestoneAddModalStateStore,
  );
  const resetMilestoneAddData = useResetRecoilState(milestoneAddFormStateStore);
  const resetActiveMilestone = useResetRecoilState(activeMilestoneStateStore);

  const projectId = useRecoilValue(projectIdState);
  const { code: userPMAuth } = useRecoilValue(projectManageAuthStateStore);
  const milestoneAddData = useRecoilValue(milestoneAddFormStateStore);

  const { mutate: createMilestone, isPending: isCreating } = useCreateMilestone(
    numStrToBigInt(projectId),
    userPMAuth,
    {
      onSuccess: (res) => {
        setSuccessSnackbar(res.message);
        resetMilestoneAddModalState();
        resetMilestoneAddData();
        resetActiveMilestone();
      },
      onError: (error) => setErrorSnackbar(error.message),
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
                  <MilestoneContentControl />
                  <MilestoneDateControl />
                </div>
              </section>
            </Modal>,
            portalElement as Element,
          )
        : null}
    </>
  );
};

export default MilestoneAddModal;
