import Input from '@/components/ui/form/Input';
import { useRecoilState } from 'recoil';
import {
  MilestoneModDataField,
  milestoneModDataStateSelector,
} from '@/features/project/auth/myProject/jobs/store/MilestoneModalStateStore';

const MilestoneModContent = () => {
  const [content, setContent] = useRecoilState(
    milestoneModDataStateSelector('content'),
  );

  return (
    <div className='flex'>
      <label
        htmlFor='content'
        className='text-gray-700 font-semibold self-center'
      >
        내용
      </label>
      <div className='w-[350px] mobile:w-[220px] ml-auto'>
        <Input
          id='content'
          placeholder='내용을 입력해주세요.'
          value={content as MilestoneModDataField<'content'>}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MilestoneModContent;
