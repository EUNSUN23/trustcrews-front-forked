import React from 'react';
import DateRangePicker from '@/components/ui/datepicker/DateRangePicker';
import { useRecoilState } from 'recoil';
import {
  MilestoneModDataField,
  milestoneModDataStateSelector,
} from '@/store/project/task/MilestoneStateStore';

function MilestoneModDate({
  initStartDate,
  initEndDate,
}: {
  initStartDate: MilestoneModDataField<'startDate'>;
  initEndDate: MilestoneModDataField<'endDate'>;
}) {
  const [startDate, setStartDate] = useRecoilState(
    milestoneModDataStateSelector('startDate'),
  );
  const [endDate, setEndDate] = useRecoilState(
    milestoneModDataStateSelector('endDate'),
  );

  const startDateValue = startDate
    ? (startDate as MilestoneModDataField<'startDate'>)
    : initStartDate;
  const endDateValue = endDate
    ? (endDate as MilestoneModDataField<'endDate'>)
    : initEndDate;

  return (
    <div className='flex'>
      <label className='text-gray-700 font-semibold self-center'>기간</label>
      <DateRangePicker
        startDate={startDateValue}
        endDate={endDateValue}
        setStartDate={(date) => setStartDate(date)}
        setEndDate={(date) => setEndDate(date)}
      />
    </div>
  );
}

export default MilestoneModDate;
