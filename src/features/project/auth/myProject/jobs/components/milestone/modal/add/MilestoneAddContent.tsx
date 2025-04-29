import Input from '@/components/ui/form/Input';
import { useRecoilState } from 'recoil';
import {
  MilestoneAddDataField,
  milestoneAddDataStateSelector,
} from '@/features/project/auth/myProject/jobs/store/MilestoneModalStateStore';

const INPUT_ID = 'milestoneAddContent';

const MilestoneAddContent = () => {
  const [content, setContent] = useRecoilState(
    milestoneAddDataStateSelector('content'),
  );

  return (
    <div className='flex'>
      <label
        htmlFor={INPUT_ID}
        className='text-gray-700 font-semibold self-center'
      >
        내용
      </label>
      <div className='w-[350px] mobile:w-[220px] ml-auto'>
        <Input
          id={INPUT_ID}
          placeholder='내용을 입력해주세요.'
          value={content as MilestoneAddDataField<'content'>}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MilestoneAddContent;
