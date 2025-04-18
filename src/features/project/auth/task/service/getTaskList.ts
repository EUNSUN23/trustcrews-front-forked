import { DataId, PageResponseBody } from '@/utils/type';
import { TaskItem } from '@/app/project/@task/_utils/type';
import { request } from '@/lib/clientApi/request';
import { TASK_STATUS } from '@/app/project/@task/_utils/constant';
import { useQuery } from '@tanstack/react-query';

export type TasksReqParam = {
  projectId: DataId;
  milestoneId: DataId;
  itemsPerPage: number;
  pageNumber?: number;
};

export function useTasks({
  projectId,
  milestoneId,
  itemsPerPage,
  pageNumber = 0,
}: TasksReqParam) {
  const { data: res, isLoading } = useQuery<
    Promise<PageResponseBody<TaskItem[]>>,
    Error,
    PageResponseBody<TaskItem[]>
  >({
    queryKey: ['taskList', milestoneId, projectId, pageNumber, itemsPerPage],
    queryFn: () =>
      getTaskList({
        milestoneId,
        projectId,
        pageNumber,
        itemsPerPage,
      }),
    staleTime: 0,
    // retry: false
  });

  return {
    taskList: res?.data.content || [],
    totalPages: res?.data.totalPages || 0,
    isTasksLoading: isLoading,
  };
}

/**
 * 업무 목록 조회
 * @param tasksReqParam
 */
export async function getTaskList(tasksReqParam: TasksReqParam) {
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
    content: updated,
  };
}

export default useTasks;
