import Input from '@/components/ui/form/Input';
import {
  MilestoneModDataField,
  milestoneModDataStateSelector,
} from '@/store/project/task/MilestoneStateStore';
import { useRecoilState } from 'recoil';

function MilestoneModContent({
  initData,
}: {
  initData: MilestoneModDataField<'content'>;
}) {
  const [content, setContent] = useRecoilState(
    milestoneModDataStateSelector('content'),
  );

  const value = content
    ? (content as MilestoneModDataField<'content'>)
    : initData;

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
          value={value}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
}

export default MilestoneModContent;
