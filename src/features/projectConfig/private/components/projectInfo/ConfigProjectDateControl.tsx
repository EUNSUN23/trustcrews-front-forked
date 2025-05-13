import { useEffect, useState } from 'react';
import DateInput from '@/shared/ui/DateInput';
import { useRecoilState } from 'recoil';
import { addDays, format } from 'date-fns';
import FormRow from '@/ui/FormRow';
import { projectInfoFormSelector } from '@/features/projectConfig/private/store/ProjectInfoFormStateStore';
import { ProjectConfigData } from '@/features/projectConfig/private/service/project/getProjectConfig';

type ProjectDateProps = {
  initStartDate: ProjectConfigData['startDate'];
  initEndDate: ProjectConfigData['endDate'];
};

const ConfigProjectDateControl = ({
  initStartDate,
  initEndDate,
}: ProjectDateProps) => {
  const [startDate, setStartDate] = useRecoilState(
    projectInfoFormSelector('startDate'),
  );
  const [endDate, setEndDate] = useRecoilState(
    projectInfoFormSelector('endDate'),
  );

  const startDateValue = startDate ? startDate : initStartDate;
  const endDateValue = endDate ? endDate : initEndDate;

  const [endMinDate, setEndMinDate] = useState<Date | null>(() =>
    addDays(new Date(startDateValue), 1),
  );

  // 시작날짜보다 종료날짜 앞서지 못하도록
  useEffect(() => {
    const endDateValueNum = Number(endDateValue.replaceAll('-', ''));
    const startDateValueNum = Number(startDateValue.replaceAll('-', ''));
    const initEndMinDate = addDays(new Date(startDateValue), 1);
    if (endDateValueNum <= startDateValueNum) {
      setEndDate(format(initEndMinDate, 'yyyy-MM-dd'));
    }
    setEndMinDate(initEndMinDate);
  }, [startDateValue, endDateValue, setEndDate, setEndMinDate]);

  return (
    <FormRow className='row-span-2 '>
      <div className='space-y-10'>
        <DateInput
          id='startDate'
          label='시작 날짜'
          placeholder='날짜를 선택해주세요.'
          date={startDateValue}
          setDate={(startDate) => setStartDate(startDate)}
        />
        <DateInput
          id='endDate'
          label='종료 날짜'
          placeholder='날짜를 선택해주세요.'
          date={endDateValue}
          setDate={(endDate) => setEndDate(endDate)}
          minDate={endMinDate}
        />
      </div>
    </FormRow>
  );
};

export default ConfigProjectDateControl;
