import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import DateRangePicker from '@/components/ui/datepicker/DateRangePicker';
import { addDays, format, subDays } from 'date-fns';
import { activeMilestoneStateStore } from '@/features/project/auth/jobs/store/ActiveMilestoneStateStore';
import {
  taskModalDataFieldSelector,
  taskModalEditDisabledSelector,
  TaskModalType,
} from '@/features/project/auth/jobs/store/TaskModalStateStore';

type TaskDateProps = {
  modalType: TaskModalType;
};

const START_DATE_INPUT_ID = 'taskStartDate';
const END_DATE_INPUT_ID = 'taskEndDate';

const TaskDate = ({ modalType }: TaskDateProps) => {
  const disabled = useRecoilValue(taskModalEditDisabledSelector(modalType));
  const { startDate: milestoneStartDate, endDate: milestoneEndDate } =
    useRecoilValue(activeMilestoneStateStore);

  const [startDate, setStartDate] = useRecoilState(
    taskModalDataFieldSelector({ modalType, fieldKey: 'startDate' }),
  );
  const [endDate, setEndDate] = useRecoilState(
    taskModalDataFieldSelector({ modalType, fieldKey: 'endDate' }),
  );

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
        includeDateIntervals={includeDateIntervals}
        startOpenToDate={new Date(milestoneStartDate)}
        disabled={disabled}
      />
    </div>
  );
};

export default TaskDate;
