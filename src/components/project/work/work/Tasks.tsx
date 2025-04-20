'use client';

import { useState } from 'react';
import TaskCard from '@/components/project/work/work/TaskCard';
import { DataId } from '@/utils/type';
import CommonPagination from '@/components/ui/CommonPagination';
import { ITEM_COUNT } from '@/utils/constant';
import { useProjectManageAuth } from '@/lib/getProjectManageAuth';
import useTasks from '@/features/project/auth/myProject/jobs/service/task/getTaskList';

const Tasks = ({
  projectId,
  milestoneId,
}: {
  projectId: DataId;
  milestoneId: bigint;
}) => {
  const {
    data: { data: currentUserPMAuth },
  } = useProjectManageAuth(projectId);
  const [pageNumber, setPageNumber] = useState(0);

  const {
    data: {
      data: { content: taskList, totalPages },
    },
  } = useTasks({
    projectId,
    milestoneId,
    pageNumber,
    itemsPerPage: ITEM_COUNT.CARDS_SM,
  });

  function onChangePageHandler(pageNumber: number) {
    setPageNumber(pageNumber - 1);
  }

  // if(isTasksLoading) return
  //     <TasksSkeleton itemCount={ITEM_COUNT.CARDS_SM} />;

  return (
    <div className='w-full mt-4 flex flex-col items-center'>
      {taskList.length > 0 ? (
        <ul className='w-full grid pc:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 grid-rows-2 mobile:grid-rows-1 place-items-center gap-4 tablet:gap-8'>
          {taskList.map((v) => (
            <li key={v.workId}>
              <TaskCard item={v} authMap={currentUserPMAuth!} />
            </li>
          ))}
        </ul>
      ) : (
        <div className='w-full h-[14rem] flex items-center justify-center bg-ground200 rounded-lg'>
          <span className='tablet:text-3xl text-grey800 font-semibold'>
            업무를 추가해 주세요
          </span>
        </div>
      )}
      <CommonPagination
        activePage={pageNumber + 1}
        totalItemsCount={totalPages}
        pageRangeDisplayed={5}
        itemsCountPerPage={ITEM_COUNT.CARDS_SM}
        onChangePageHandler={onChangePageHandler}
      />
    </div>
  );
};

export default Tasks;
