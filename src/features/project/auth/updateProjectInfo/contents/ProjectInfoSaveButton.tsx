'use client';

import Button from '@/components/ui/button';
import { useRecoilValue } from 'recoil';
import useSnackbar from '@/hooks/common/useSnackbar';
import { projectIdState } from '@/features/project/auth/global/store/ProjectIdStateStore';
import { projectManageAuthStateStore } from '@/features/project/auth/projectManageAuth/store/ProjectManageAuthStateStore';
import { numStrToBigInt } from '@/utils/common';
import {
  UpdateProjectInfoInput,
  useUpdateProjectInfo,
} from '@/features/project/auth/updateProjectInfo/service/updateProjectInfo';
import { projectInfoFormStateStore } from '@/features/project/auth/updateProjectInfo/store/ProjectInfoFormStateStore';
import { ProjectPublicInfoData } from '@/utils/type';

type ProjectInfoSaveButtonProps = {
  initData: ProjectPublicInfoData;
};

const ProjectInfoSaveButton = ({ initData }: ProjectInfoSaveButtonProps) => {
  const projectId = useRecoilValue(projectIdState);
  const { code: userPMAuth } = useRecoilValue(projectManageAuthStateStore);

  const projectSettingInfo = useRecoilValue(projectInfoFormStateStore);
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();

  const { mutate: updatePost, isPending: isUpdating } = useUpdateProjectInfo(
    numStrToBigInt(projectId),
    userPMAuth,
    {
      onSuccess: (res) => setSuccessSnackbar(res.message),
      onError: (res) => setErrorSnackbar(res.message),
    },
  );

  const handleClickUpdateButton = () => {
    const {
      projectName: initProjectName,
      projectSubject: initProjectSubject,
      startDate: initStartDate,
      endDate: initEndDate,
      technologyStacks: initTechnologyStacks,
    } = initData;

    const { projectName, projectSubject, startDate, endDate, technologyIds } =
      projectSettingInfo;

    const reqData: UpdateProjectInfoInput = {
      projectName: projectName ? projectName : initProjectName,
      projectSubject: projectSubject ? projectSubject : initProjectSubject,
      startDate: startDate ? startDate : initStartDate,
      endDate: endDate ? endDate : initEndDate,
      technologyIds:
        technologyIds.length > 0
          ? technologyIds
          : initTechnologyStacks.map((v) => v.techStackId),
    };

    updatePost(reqData);
  };

  return (
    <Button
      size='md'
      onClick={handleClickUpdateButton}
      disabled={isUpdating}
      className='disabled:!bg-gray-400 disabled:!text-white'
    >
      저장
    </Button>
  );
};

export default ProjectInfoSaveButton;
