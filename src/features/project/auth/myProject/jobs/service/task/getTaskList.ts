import { DataId, PageResponseBody } from '@/utils/type';
import { TaskItem } from '@/app/project/@task/_utils/type';
import { request } from '@/lib/clientApi/request';
import { TASK_STATUS } from '@/app/project/@task/_utils/constant';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ITEM_COUNT } from '@/utils/constant';

export type TasksReqParam = {
  projectId: DataId;
  milestoneId: DataId;
  itemsPerPage: number;
  pageNumber: number;
};

export const getTaskList = async (tasksReqParam: TasksReqParam) => {
  const {
    milestoneId,
    projectId,
    pageNumber: pageIndex,
    itemsPerPage: itemCount,
  } = tasksReqParam;

  const res: PageResponseBody<TaskItem[]> = await request(
    'GET',
    `/api/project/work?milestoneId=${milestoneId}&projectId=${projectId}&pageIndex=${pageIndex}&itemCount=${itemCount}`,
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const updated = res.data.content.map((v) => {
    if (v.progressStatus.name === '완료') {
      return v;
    } else {
      const startDate = v.startDate;
      const y = parseInt(startDate.substring(0, 4), 10);
      const m = parseInt(startDate.substring(4, 6), 10) - 1;
      const d = parseInt(startDate.substring(6, 8), 10);
      const date = new Date(y, m, d);

      if (date.getTime > today.getTime) {
        return { ...v, progressStatus: TASK_STATUS.PS001 };
      } else {
        return { ...v, progressStatus: TASK_STATUS.PS002 };
      }
    }
  });

  return {
    ...res,
    data: {
      content: updated,
      totalPages: res.data.totalPages,
    },
  };
};

export const getTaskListQueryKey = ['taskList'];

export const useTasks = ({
  projectId,
  milestoneId,
  pageNumber = 0,
}: {
  projectId: bigint;
  milestoneId: bigint;
  pageNumber?: number;
}) => {
  return useSuspenseQuery({
    queryKey: [...getTaskListQueryKey, milestoneId, projectId, pageNumber],
    queryFn: () =>
      getTaskList({
        milestoneId,
        projectId,
        pageNumber,
        itemsPerPage: ITEM_COUNT.CARDS_SM,
      }),
  });
};

export default useTasks;
