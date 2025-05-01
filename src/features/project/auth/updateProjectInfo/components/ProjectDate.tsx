import { useEffect, useState } from 'react';
import CalendarInput from '@/components/ui/form/CalendarInput';
import { useRecoilState } from 'recoil';
import { addDays, format } from 'date-fns';
import FormRow from '@/components/ui/form/FormRow';
import { projectInfoFormSelector } from '@/features/project/auth/updateProjectInfo/store/ProjectInfoFormStateStore';
import { ProjectPublicInfoData } from '@/utils/type';

type ProjectDateProps = {
  initStartDate: ProjectPublicInfoData['startDate'];
  initEndDate: ProjectPublicInfoData['endDate'];
};

const ProjectDate = ({ initStartDate, initEndDate }: ProjectDateProps) => {
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
    const endDateValueNum = parseInt(endDateValue.replaceAll('-', ''));
    const startDateValueNum = parseInt(startDateValue.replaceAll('-', ''));
    const initEndMinDate = addDays(new Date(startDateValue), 1);
    if (endDateValueNum <= startDateValueNum) {
      setEndDate(format(initEndMinDate, 'yyyy-MM-dd'));
    }
    setEndMinDate(initEndMinDate);
  }, [startDateValue, endDateValue, setEndDate, setEndMinDate]);

  return (
    <FormRow className='row-span-2 '>
      <div className='space-y-10'>
        <CalendarInput
          id='startDate'
          label='시작 날짜'
          placeholder='날짜를 선택해주세요.'
          date={startDateValue}
          setDate={(startDate) => setStartDate(startDate)}
        />
        <CalendarInput
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

export default ProjectDate;
