'use client';

import { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import Modal from '@/components/ui/Modal';
import { createPortal } from 'react-dom';
import {
  MilestoneModDataField,
  milestoneModDataStateStore,
  milestoneModModalStateStore,
} from '@/store/project/task/MilestoneStateStore';
import MilestoneModContent from '@/components/project/work/milestone/modal/mod/MilestoneModContent';
import MilestoneModDate from '@/components/project/work/milestone/modal/mod/MilestoneModDate';
import { bigIntToString } from '@/utils/common';
import { useMilestoneDetail } from '@/features/project/auth/myProject/jobs/service/milestone/getMilestoneDetail';
import {
  updateMilestoneSchema,
  useUpdateMilestone,
} from '@/features/project/auth/myProject/jobs/service/milestone/updateMilestone';
import useSnackbar from '@/hooks/common/useSnackbar';
import { ZodError } from 'zod';

function MilestoneModModal() {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const { isOpen, title } = useRecoilValue(milestoneModModalStateStore);
  const resetMilestoneModModalState = useResetRecoilState(
    milestoneModModalStateStore,
  );
  const resetMilestoneModData = useResetRecoilState(milestoneModDataStateStore);
  const milestoneModData = useRecoilValue(milestoneModDataStateStore);
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  const {
    data: { data: milestoneInfo },
  } = useMilestoneDetail(
    bigIntToString(
      milestoneModData.milestoneId as MilestoneModDataField<'milestoneId'>,
    ),
    isOpen,
  );

  const { mutate: updateMilestone, isPending: isUpdating } =
    useUpdateMilestone();

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

  // if (isFetching || !milestoneInfo) return null;

  const {
    content: initContent,
    startDate: initStartDate,
    endDate: initEndDate,
    updateDate,
  } = milestoneInfo!;

  // 마일스톤 수정
  const onClickConfirmHandler = () => {
    const { content, startDate, endDate } = milestoneModData;

    const data = {
      content: content ? content : initContent,
      startDate: startDate ? startDate : initStartDate,
      endDate: endDate ? endDate : initEndDate,
    };

    try {
      updateMilestoneSchema.parse(data);
    } catch (e: unknown) {
      setErrorSnackbar((e as ZodError).errors[0].message);
      return;
    }

    updateMilestone(data);
  };

  // 모달 close
  const onCloseHandler = () => {
    resetMilestoneModData();
    resetMilestoneModModalState();
  };

  return (
    <>
      {isOpen && portalElement
        ? createPortal(
            <Modal
              isOpen={isOpen}
              close={onCloseHandler}
              title={title}
              isUpdating={isUpdating}
              onClickConfirmHandler={onClickConfirmHandler}
            >
              <section className='tablet:w-[450px] mobile:w-[280px] max-h-[500px] mb-4 flex-col mt-5'>
                <div className='space-y-5 mobile:space-y-3 mx-4 mobile:mx-0 mobile:text-sm'>
                  <MilestoneModContent initData={initContent} />
                  <MilestoneModDate
                    initStartDate={initStartDate}
                    initEndDate={initEndDate}
                  />
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
            portalElement,
          )
        : null}
    </>
  );
}

export default MilestoneModModal;
