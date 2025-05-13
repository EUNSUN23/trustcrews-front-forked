'use client';

import Button from '@/shared/ui/Button';
import { useRecoilValue } from 'recoil';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { projectIdState } from '@/features/project/private/store/myProject/ProjectIdStateStore';
import { projectInfoFormStateStore } from '@/features/projectConfig/private/store/ProjectInfoFormStateStore';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { ProjectInfoSummary } from '@/service/project/public/getProjectInfoSummary';
import {
  UpdateProjectInfoInput,
  useUpdateProjectInfo,
} from '@/service/project/private/updateProjectInfo';
import { projectManageAuthStateStore } from '@/features/projectConfig/private/store/ProjectManageAuthStateStore';

type ProjectInfoSaveButtonProps = {
  initData: ProjectInfoSummary;
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
          ? technologyIds.map((v) => numStrToBigInt(v))
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
