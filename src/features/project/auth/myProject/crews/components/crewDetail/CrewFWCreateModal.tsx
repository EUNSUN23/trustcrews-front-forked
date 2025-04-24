'use client';

import { ChangeEvent } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  crewFWModalDataStateStore,
  crewFWModalStateStore,
} from '@/features/project/auth/myProject/crews/store/CrewFWModalStateStore';
import { createPortal } from 'react-dom';
import Modal from '@/components/ui/Modal';
import useSnackbar from '@/hooks/common/useSnackbar';
import {
  createCrewFWVoteInputSchema,
  useCreateCrewFWVote,
} from '@/features/project/auth/myProject/vote/service/createCrewFWVote';
import { ZodError } from 'zod';
import { FWReason } from '@/features/project/auth/myProject/vote/constants';
import useModalPortalElement from '@/hooks/common/useModalPortalElement';

const {
  FWR1001: REASON_CORP,
  FWR1002: REASON_ATT,
  FWR1003: REASON_TECH,
  FWR1004: REASON_ETC,
} = FWReason;

const CrewFWCreateModal = () => {
  const { isOpen, title, projectId, crewId, crewPMAuth, userPMAuth } =
    useRecoilValue(crewFWModalStateStore);

  const [portalElement] = useModalPortalElement(isOpen);

  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const resetModalState = useResetRecoilState(crewFWModalStateStore);
  const [reason, setReason] = useRecoilState(crewFWModalDataStateStore);

  const { mutate: createCrewFWVote } = useCreateCrewFWVote(
    { projectId, crewId, crewPMAuth, userPMAuth },
    {
      onSuccess: (res) => setSuccessSnackbar(res.message),
      onError: (res) => setErrorSnackbar(res.message),
    },
  );

  const handleClickConfirmButton = () => {
    try {
      createCrewFWVoteInputSchema.parse({ reason });
    } catch (e: unknown) {
      setErrorSnackbar((e as ZodError).errors[0].message);
      return;
    }
    createCrewFWVote(reason);
  };

  const handleChangeFWReason = (e: ChangeEvent<HTMLInputElement>) => {
    setReason({
      reason: e.target.value,
    });
  };

  return (
    <>
      {isOpen && portalElement
        ? createPortal(
            <Modal
              isOpen={isOpen}
              close={() => resetModalState()}
              title={title}
              onClickConfirmHandler={handleClickConfirmButton}
            >
              <section className='alertModal_contents'>
                <section>
                  <div className='mt-6 mb-4 text-lg text-greyDarkblue font-semibold'>
                    강제탈퇴 사유를 다음 중에서 선택해 주세요.
                  </div>
                  <ul className='w-[65%] mx-auto mb-4 flex flex-col items-start space-y-2'>
                    <li>
                      <input
                        type='radio'
                        name='fwReason'
                        value={REASON_CORP.code}
                        id='fwr1001'
                        className='border-gray-400 text-indigo-600 focus:ring-none'
                        onChange={handleChangeFWReason}
                      />
                      <label htmlFor='fwr1001' className='ml-2'>
                        {REASON_CORP.desc}
                      </label>
                    </li>
                    <li>
                      <input
                        type='radio'
                        name='fwReason'
                        value={REASON_ATT.code}
                        id='fwr1002'
                        className='border-gray-400 text-indigo-600 focus:ring-none'
                        onChange={handleChangeFWReason}
                      />
                      <label htmlFor='fwr1002' className='ml-2'>
                        {REASON_ATT.desc}
                      </label>
                    </li>
                    <li>
                      <input
                        type='radio'
                        name='fwReason'
                        value={REASON_TECH.code}
                        id='fwr1003'
                        className='border-gray-400 text-indigo-600 focus:ring-none'
                        onChange={handleChangeFWReason}
                      />
                      <label htmlFor='fwr1003' className='ml-2'>
                        {REASON_TECH.desc}
                      </label>
                    </li>
                    <li>
                      <input
                        type='radio'
                        name='fwReason'
                        value={REASON_ETC.code}
                        id='fwr1004'
                        className='border-gray-400 text-indigo-600 focus:ring-none'
                        onChange={handleChangeFWReason}
                      />
                      <label htmlFor='fwr1004' className='ml-2'>
                        {REASON_ETC.desc}
                      </label>
                    </li>
                  </ul>
                </section>
              </section>
            </Modal>,
            portalElement as Element,
          )
        : null}
    </>
  );
};

export default CrewFWCreateModal;
