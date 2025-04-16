import { FieldGroupSkeleton } from '@/components/ui/skeleton/FieldGroupSkeleton';

const fields = [
  '프로젝트 이륾',
  '시작 날짜',
  '프로젝트 주제',
  '종료 날짜',
  '기술 스택',
];

export function ProjectInfoSkeleton() {
  return (
    <div className='grid grid-cols-2 gap-y-8 mobile:grid-cols-1 mobile:gap-y-0 mobile:text-sm'>
      {fields.map((v) => (
        <FieldGroupSkeleton key={`field-${v}`} label={v} />
      ))}
    </div>
  );
}
