import DateInput from '@/shared/ui/DateInput';
import { useRecoilState } from 'recoil';
import FormRow from '@/components/FormRow';
import { projectFormFieldSelector } from '@/features/launch/private/store/ProjectFormStateStore';

const LaunchProjectDateControl = () => {
  const [startDate, setStartDate] = useRecoilState(
    projectFormFieldSelector('startDate'),
  );
  const [endDate, setEndDate] = useRecoilState(
    projectFormFieldSelector('endDate'),
  );

  const handleChangeStartDate = (value: string) => {
    setStartDate(value);
  };

  const handleChangeEndDate = (value: string) => {
    setEndDate(value);
  };

  return (
    <FormRow className='pc:place-self-center row-span-2 '>
      <div className='space-y-10'>
        <DateInput
          id='startDate'
          label='시작 날짜'
          date={startDate}
          setDate={handleChangeStartDate}
        />
        <DateInput
          id='endDate'
          label='종료 날짜'
          date={endDate}
          setDate={handleChangeEndDate}
        />
      </div>
    </FormRow>
  );
};

export default LaunchProjectDateControl;
