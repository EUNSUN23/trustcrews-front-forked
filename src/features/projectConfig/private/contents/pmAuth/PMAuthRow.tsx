import { useState } from 'react';
import Avatar from '@/shared/ui/Avatar';
import Badge from '@/shared/ui/Badge';
import Button from '@/shared/ui/Button';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { ProjectCrew } from '@/features/projectCrews/private/types';
import { useRecoilValue } from 'recoil';
import { projectIdState } from '@/features/project/private/store/myProject/ProjectIdStateStore';
import { ZodError } from 'zod';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { projectManageAuthStateStore } from '@/features/projectConfig/private/store/ProjectManageAuthStateStore';
import {
  UpdatePMAuthConfigInput,
  updatePMAuthConfigInputSchema,
  useUpdatePMAuthConfig,
} from '@/features/projectConfig/private/service/pmAuth/updatePMAuthConfig';
import PMAuthSelector from '@/features/projectConfig/private/components/pmAuth/PMAuthSelector';
import FieldQueryBoundary from '@/components/error/FieldQueryBoundary';

type CrewAuthRowProps = {
  crew: ProjectCrew;
};

const PMAuthRow = ({ crew }: CrewAuthRowProps) => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const { code: userAuth } = useRecoilValue(projectManageAuthStateStore);
  const projectId = useRecoilValue(projectIdState);
  const {
    projectMemberAuth: initCrewAuth,
    user,
    position,
    projectMemberId: crewId,
  } = crew;

  const [auth, setAuth] = useState(() => ({
    name: initCrewAuth.name,
    value: initCrewAuth.code,
  }));

  const { mutate: updateCrewPMAuth } = useUpdatePMAuthConfig(
    numStrToBigInt(projectId),
    crewId,
    userAuth,
    {
      onSuccess: (res) => setSuccessSnackbar(res.message),
      onError: (res) => setErrorSnackbar(res.message),
    },
  );

  const handleClickSaveButton = () => {
    const data: UpdatePMAuthConfigInput = {
      crewAuth: auth.value,
    };

    try {
      updatePMAuthConfigInputSchema.parse(data);
    } catch (e) {
      if (e instanceof ZodError) setErrorSnackbar(e.errors[0].message);
      return;
    }

    updateCrewPMAuth(data);
  };

  return (
    <tr>
      <td className='tablet:w-[40%] mobile:w-[20%] whitespace-nowrap py-5 pl-4 pr-3 text-base'>
        <div className=' flex items-center'>
          <div className='h-11 w-11 flex-shrink-0 mobile:hidden'>
            <Avatar
              alt='크루 프로필 이미지'
              size='xs'
              src={user.profileImgSrc}
            />
          </div>
          <div className='ml-4 mobile:ml-0'>
            <div className='font-medium text-gray-900'>{user.nickname}</div>
          </div>
          <div className='ml-3 mobile:ml-2'>
            <Badge text={position.positionName} size='sm' />
          </div>
        </div>
      </td>
      <td className='max-w-[30%] whitespace-nowrap px-3 py-5 text-sm text-gray-500'>
        <div className=' flex items-center'>
          <FieldQueryBoundary
            suspenseFallback={
              <SelectSkeleton className='w-[230px] mobile:w-[95px] h-[42px]' />
            }
          >
            <PMAuthSelector value={auth} setValue={setAuth} />
          </FieldQueryBoundary>
        </div>
      </td>
      <td className='max-w-[30%] relative whitespace-nowrap py-5 pl-3 pr-4 tablet:text-right text-sm font-medium sm:pr-0'>
        <div className='w-[100px] mobile:w-[80px]'>
          <Button theme='primary' onClick={handleClickSaveButton}>
            저장
            <span className='sr-only'>, 이름</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default PMAuthRow;
