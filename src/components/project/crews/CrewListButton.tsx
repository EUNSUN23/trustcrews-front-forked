'use client';

import Link from 'next/link';
import Button from '@/components/ui/button';
import { useRecoilValue } from 'recoil';
import { projectIdState } from '@/store/project/ProjectInfoStateStore';

function CrewListButton() {
  const projectId = useRecoilValue(projectIdState)!;
  return (
    <Link
      href={{
        pathname: '/project/crews',
        query: { projectId },
      }}
    >
      <Button size='xl' theme='primaryHollow'>
        크루 목록
      </Button>
    </Link>
  );
}

export default CrewListButton;
