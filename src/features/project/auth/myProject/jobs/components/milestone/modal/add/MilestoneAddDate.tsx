import { useEffect } from 'react';
import DateRangePicker from '@/components/ui/datepicker/DateRangePicker';
import { useRecoilState } from 'recoil';
import { addDays, format } from 'date-fns';
import { milestoneAddDataStateSelector } from '@/features/project/auth/myProject/jobs/store/MilestoneModalStateStore';

const MilestoneAddDate = () => {
  const [startDate, setStartDate] = useRecoilState(
    milestoneAddDataStateSelector('startDate'),
  );
  const [endDate, setEndDate] = useRecoilState(
    milestoneAddDataStateSelector('endDate'),
  );

  useEffect(() => {
    if (!startDate) {
      setStartDate(format(new Date(), 'yyyy-MM-dd'));
    }

    if (!endDate) {
      setEndDate(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
    }
  }, [startDate, endDate, setStartDate, setEndDate]);

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

export default MilestoneAddDate;
