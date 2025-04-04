import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  taskModalDataFieldSelector,
  taskModalEditDisabledSelector,
  TaskModalType,
} from '@/store/project/task/TaskStateStore';
import DateRangePicker from '@/components/ui/datepicker/DateRangePicker';
import { addDays, format, subDays } from 'date-fns';
import { milestoneActiveStateStore } from '@/store/project/task/MilestoneStateStore';

function TaskDate({ modalType }: { modalType: TaskModalType }) {
  const disabled = useRecoilValue(taskModalEditDisabledSelector(modalType));
  const { activeMilestone } = useRecoilValue(milestoneActiveStateStore);
  const { startDate: milestoneStartDate, endDate: milestoneEndDate } =
    activeMilestone!;

  const [startDate, setStartDate] = useRecoilState(
    taskModalDataFieldSelector({ modalType, fieldKey: 'startDate' }),
  );
  const [endDate, setEndDate] = useRecoilState(
    taskModalDataFieldSelector({ modalType, fieldKey: 'endDate' }),
  );

  // 시작/종료날짜 초기화
  useEffect(() => {
    if (milestoneStartDate && milestoneEndDate) {
      if (!startDate) {
        setStartDate(milestoneStartDate);
      }
      if (!endDate) {
        setEndDate(
          format(addDays(new Date(milestoneStartDate), 1), 'yyyy-MM-dd'),
        );
      }
    }
  }, [
    startDate,
    endDate,
    setEndDate,
    setStartDate,
    milestoneStartDate,
    milestoneEndDate,
  ]);

  const includeDateIntervals = [
    {
      start: subDays(new Date(milestoneStartDate), 1),
      end: new Date(milestoneEndDate),
    },
  ];

  return (
    <div className='flex mobile:space-x-6'>
      <label className='text-gray-700 font-semibold self-center'>기간</label>
      <DateRangePicker
        startDate={startDate as string}
        endDate={endDate as string}
        setStartDate={(date) => setStartDate(date)}
        setEndDate={(date) => setEndDate(date)}
        includeDateIntervals={includeDateIntervals}
        startOpenToDate={new Date(milestoneStartDate)}
        disabled={disabled}
      />
    </div>
  );
}

export default TaskDate;
