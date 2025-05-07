import { Suspense, useState } from 'react';
import Avatar from '@/components/ui/Avatar';
import PositionBadge from '@/components/ui/badge/PositionBadge';
import Button from '@/components/ui/form/Button';
import useSnackbar from '@/shared/hooks/useSnackbar';
import PMAuthSelector from '@/features/project/auth/projectManageAuth/components/PMAuthSelector';
import { ProjectCrew } from '@/features/project/auth/projectCrews/types';
import { useRecoilValue } from 'recoil';
import { projectManageAuthStateStore } from '@/features/project/auth/projectManageAuth/store/ProjectManageAuthStateStore';
import { projectIdState } from '@/features/project/auth/global/store/ProjectIdStateStore';
import {
  UpdateCrewPMAuthInput,
  updateCrewPMAuthInputSchema,
  useUpdateCrewPMAuth,
} from '@/features/project/auth/projectManageAuth/service/updateCrewPMAuth';
import { ZodError } from 'zod';
import SelectSkeleton from '@/components/ui/skeleton/SelectSkeleton';
import { numStrToBigInt } from '@/shared/utils/stringUtils';

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

  const { mutate: updateCrewPMAuth } = useUpdateCrewPMAuth(
    numStrToBigInt(projectId),
    crewId,
    userAuth,
    {
      onSuccess: (res) => setSuccessSnackbar(res.message),
      onError: (res) => setErrorSnackbar(res.message),
    },
  );

  const handleClickSaveButton = () => {
    const data: UpdateCrewPMAuthInput = {
      crewAuth: auth.value,
    };

    try {
      updateCrewPMAuthInputSchema.parse(data);
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
            <PositionBadge text={position.name} size='sm' />
          </div>
        </div>
      </td>
      <td className='max-w-[30%] whitespace-nowrap px-3 py-5 text-sm text-gray-500'>
        <div className=' flex items-center'>
          <Suspense
            fallback={
              <SelectSkeleton
                label=''
                className='w-[230px] mobile:w-[95px] h-[42px]'
              />
            }
          >
            <PMAuthSelector value={auth} setValue={setAuth} />
          </Suspense>
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
