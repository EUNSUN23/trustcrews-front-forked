import DateRangePicker from '@/components/ui/datepicker/DateRangePicker';
import { useRecoilState } from 'recoil';
import { milestoneModDataStateSelector } from '@/features/project/auth/jobs/store/MilestoneModalStateStore';

const START_DATE_INPUT_ID = 'milestoneModStartDate';
const END_DATE_INPUT_ID = 'milestoneModEndDate';

const MilestoneModDate = () => {
  const [startDate, setStartDate] = useRecoilState(
    milestoneModDataStateSelector('startDate'),
  );
  const [endDate, setEndDate] = useRecoilState(
    milestoneModDataStateSelector('endDate'),
  );

  return (
    <div className='flex'>
      <label
        htmlFor={START_DATE_INPUT_ID}
        className='text-gray-700 font-semibold self-center'
      >
        기간
      </label>
      <DateRangePicker
        startDateId={START_DATE_INPUT_ID}
        endDateId={END_DATE_INPUT_ID}
        startDate={startDate}
        endDate={endDate}
        setStartDate={(date) => setStartDate(date)}
        setEndDate={(date) => setEndDate(date)}
      />
    </div>
  );
};

export default MilestoneModDate;
