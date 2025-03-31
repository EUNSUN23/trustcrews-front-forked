import Input from '@/components/ui/form/Input';
import {
  MilestoneAddDataField,
  milestoneAddDataStateSelector,
} from '@/store/project/task/MilestoneStateStore';
import { useRecoilState } from 'recoil';

function MilestoneAddContent() {
  const [content, setContent] = useRecoilState(
    milestoneAddDataStateSelector('content'),
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
          value={content as MilestoneAddDataField<'content'>}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
}

export default MilestoneAddContent;
