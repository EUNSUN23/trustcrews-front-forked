import { ChangeEvent } from 'react';
import { FWReason } from '@/service/project/alert/constant';
import { useSetRecoilState } from 'recoil';
import { crewFWModalStateStore } from '@/store/project/alert/modal/CrewFWModalStateStore';
import { FWReasonCode } from '@/service/project/alert/type';

const FwCreateModalContents = () => {
  const setCrewFWModalState = useSetRecoilState(crewFWModalStateStore);

  const handleChangeFWReason = (e: ChangeEvent<HTMLInputElement>) => {
    setCrewFWModalState((prev) => ({
      ...prev,
      createData: {
        ...prev.createData,
        reason: e.target.value as FWReasonCode,
      },
    }));
  };

  return (
    <section className='alertModal_contents'>
      <section>
        <div className='bg-ground200 rounded-md px-5 py-6'>
          <div className='my-2 text-2xl text-greyDarkblue font-semibold'>
            주의사항
          </div>
          <ul className='max-h-[200px] overflow-auto text-left'>
            <li className='my-2'>
              •매니저 강제탈퇴 투표는 매니저 권한 크루만 신청할 수 있습니다.
            </li>
            <li className='my-2'>
              •탈퇴대상자를 제외한 프로젝트 멤버가 <strong>1명 이상</strong>
              이어야 투표를 생성할 수 있습니다.
            </li>
            <li className='my-2'>
              •투표자 과반수가 강제탈퇴에 찬성할 경우, 해당 멤버는 자동으로
              강제탈퇴 처리 됩니다.
            </li>
            <li className='my-2'>
              •생성된 투표는 프로젝트 <strong>[알림]</strong> 탭의{' '}
              <strong>[강제탈퇴]</strong>에서 확인할 수 있습니다.
            </li>
            <li className='my-3'>
              <span className='font-bold text-lg'>
                프로젝트 강제탈퇴시 불이익:
              </span>
              <ul className='p-3'>
                <li>• 강제탈퇴 이후 프로젝트에 재참여할 수 없습니다.</li>
                <li>
                  • 강제탈퇴자의 신뢰등급에 비례하여 신뢰점수가 차감됩니다.
                </li>
                <li>
                  • 강제탈퇴 기록이 프로젝트 이력에 남으며, 프로젝트 지원시
                  조회됩니다.
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className='mt-6 mb-4 text-lg text-greyDarkblue font-semibold'>
          강제탈퇴 사유를 다음 중에서 선택해 주세요.
        </div>
        <ul className='w-[65%] mx-auto mb-4 flex flex-col items-start space-y-2'>
          <li>
            <input
              type='radio'
              name='fwReason'
              value={FWReason.FWR1001.code}
              id='fwr1001'
              className='border-gray-400 text-indigo-600 focus:ring-none'
              onChange={handleChangeFWReason}
            />
            <label htmlFor='fwr1001' className='ml-2'>
              {FWReason.FWR1001.name}
            </label>
          </li>
          <li>
            <input
              type='radio'
              name='fwReason'
              value={FWReason.FWR1002.code}
              id='fwr1002'
              className='border-gray-400 text-indigo-600 focus:ring-none'
              onChange={handleChangeFWReason}
            />
            <label htmlFor='fwr1002' className='ml-2'>
              {FWReason.FWR1002.name}
            </label>
          </li>
          <li>
            <input
              type='radio'
              name='fwReason'
              value={FWReason.FWR1003.code}
              id='fwr1003'
              className='border-gray-400 text-indigo-600 focus:ring-none'
              onChange={handleChangeFWReason}
            />
            <label htmlFor='fwr1002' className='ml-2'>
              {FWReason.FWR1003.name}
            </label>
          </li>
          <li>
            <input
              type='radio'
              name='fwReason'
              value={FWReason.FWR1004.code}
              id='fwr1004'
              className='border-gray-400 text-indigo-600 focus:ring-none'
              onChange={handleChangeFWReason}
            />
            <label htmlFor='fwr1002' className='ml-2'>
              {FWReason.FWR1004.name}
            </label>
          </li>
        </ul>
      </section>
    </section>
  );
};

export default FwCreateModalContents;
