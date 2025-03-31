'use client';
import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
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
      <Button size='xl' theme='primary-hollow'>
        크루 목록
      </Button>
    </Link>
  );
}

export default CrewListButton;
