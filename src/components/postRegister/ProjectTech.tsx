import TechStackSelect from '@/components/ui/form/TechStackSelect';
import {useRecoilState} from 'recoil';
import {projectFieldSelector} from '@/features/registerProjectPost/store/RegisterProjectPostStateStore';
import {TechStackValueType} from '@/utils/type';
import FormRow from '@/components/ui/form/FormRow';

function ProjectTech() {
  const [{ technologyIds }, setTechIds] = useRecoilState(
    projectFieldSelector('technologyIds'),
  );

  return (
    <FormRow>
      <TechStackSelect
        techStacks={technologyIds!}
        setTechStacks={(item: readonly TechStackValueType[]) =>
          setTechIds({ technologyIds: item })
        }
        label='사용 스택'
      />
    </FormRow>
  );
}

export default ProjectTech;
