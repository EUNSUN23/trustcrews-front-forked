import { useRecoilValue } from 'recoil';
import { projectIdState } from '@/features/project/private/store/myProject/ProjectIdStateStore';
import PMAuthRow from '@/features/projectConfig/private/contents/pmAuth/PMAuthRow';
import { useProjectCrewList } from '@/features/projectCrews/private/service/getProjectCrewList';
import ConfigContainer from '@/features/projectConfig/private/layouts/ConfigContainer';
import ConfigSummary from '@/features/projectConfig/private/layouts/ConfigSummary';

const PMAuth = () => {
  const projectId = useRecoilValue(projectIdState);

  const {
    data: {
      data: { projectMembers: crewList },
    },
  } = useProjectCrewList(projectId);

  return (
    <ConfigContainer>
      <ConfigSummary>크루 권한</ConfigSummary>
      <div className='mx-auto mt-8 flow-root'>
        <div className='-ml-4 -my-2 sm:-ml-6 lg:-ml-12'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <table className='min-w-full divide-y divide-gray-300'>
              <tbody className='divide-y divide-gray-200 bg-white'>
                {crewList.map((crew) => (
                  <PMAuthRow key={crew.projectMemberId} crew={crew} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ConfigContainer>
  );
};

export default PMAuth;
