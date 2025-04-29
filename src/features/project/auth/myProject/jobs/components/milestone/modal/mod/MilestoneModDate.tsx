import DateRangePicker from '@/components/ui/datepicker/DateRangePicker';
import { useRecoilState } from 'recoil';
import { milestoneModDataStateSelector } from '@/features/project/auth/myProject/jobs/store/MilestoneModalStateStore';

const MilestoneModDate = () => {
  const [startDate, setStartDate] = useRecoilState(
    milestoneModDataStateSelector('startDate'),
  );
  const [endDate, setEndDate] = useRecoilState(
    milestoneModDataStateSelector('endDate'),
  );

  return (
    <div className='flex'>
      <label className='text-gray-700 font-semibold self-center'>기간</label>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={(date) => setStartDate(date)}
        setEndDate={(date) => setEndDate(date)}
      />
    </div>
  );
};

export default MilestoneModDate;
