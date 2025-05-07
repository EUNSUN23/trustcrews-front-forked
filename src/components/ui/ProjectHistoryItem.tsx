import { AiFillRocket } from '@react-icons/all-files/ai/AiFillRocket';
import { BiUser } from '@react-icons/all-files/bi/BiUser';
import { BiCheck } from '@react-icons/all-files/bi/BiCheck';
import { BiUndo } from '@react-icons/all-files/bi/BiUndo';
import { BiX } from '@react-icons/all-files/bi/BiX';
import { clsx } from 'clsx';
import cn from '@/shared/styles/cn';
import {
  ProjectHistoryData,
  ProjectHistoryStatus,
} from '@/lib/projectHistory/types';

const HISTORY_COLOR = {
  LAUNCH: 'bg-orange-400',
  JOIN: 'bg-blue-500',
  FINISH: 'bg-green-500',
  WITHDRAW: 'bg-gray-400',
  FWITHDRAW: 'bg-red-400',
} as const;
const { LAUNCH, JOIN, FINISH, FWITHDRAW, WITHDRAW } = HISTORY_COLOR;

const iconColorClassName = (status: ProjectHistoryStatus) =>
  clsx({
    [LAUNCH]: status.code === 'PHIST_STAT_001',
    [JOIN]: status.code === 'PHIST_STAT_002',
    [FINISH]: status.code === 'PHIST_STAT_003',
    [WITHDRAW]: status.code === 'PHIST_STAT_004',
    [FWITHDRAW]: status.code === 'PHIST_STAT_005',
  });

const getIconByStatus = (status: ProjectHistoryStatus) => {
  const iconClassName = 'h-5 w-5 text-white';

  switch (status.code) {
    case 'PHIST_STAT_001':
      return <AiFillRocket className={iconClassName} aria-hidden={true} />;
    case 'PHIST_STAT_002':
      return <BiUser className={iconClassName} aria-hidden={true} />;
    case 'PHIST_STAT_003':
      return <BiCheck className={iconClassName} aria-hidden={true} />;
    case 'PHIST_STAT_004':
      return <BiUndo className={iconClassName} aria-hidden={true} />;
    case 'PHIST_STAT_005':
      return <BiX className={iconClassName} aria-hidden={true} />;
    default:
      return <></>;
  }
};

function ProjectHistoryItem({
  history,
  isLast,
}: {
  history: ProjectHistoryData;
  isLast: boolean;
}) {
  return (
    <>
      {!isLast && (
        <div
          className='absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200'
          aria-hidden='true'
        />
      )}
      <ul className='relative grid grid-cols-12 grid-rows-1'>
        <li className='mobile:col-span-2' aria-hidden={true}>
          <div
            className={cn(
              iconColorClassName(history.status),
              'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
            )}
          >
            <span className='sr-only'>{history.status.name}</span>
            {getIconByStatus(history.status)}
          </div>
        </li>
        <li className='pt-1 col-span-3 tablet:col-span-4 mobile:col-span-7 tablet:text-lg mobile:text-sm font-medium text-gray-900'>
          {history.projectName}
        </li>
        <li className='pt-1 col-span-7 tablet:col-span-6 mobile:sr-only text-gray-500'>
          {history.status.name}
        </li>
        <li className='pt-1 mobile:col-span-3 whitespace-nowrap mobile:text-xs text-right text-gray-500 '>
          <time dateTime={history.updateDate}>{history.updateDate}</time>
        </li>
      </ul>
    </>
  );
}

export default ProjectHistoryItem;
