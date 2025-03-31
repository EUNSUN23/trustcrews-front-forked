import { useState } from 'react';
import Button from '@/components/ui/Button';
import ApplicantProjectHistoryList from '@/components/ui/ApplicantProjectHistoryList';

function ApplicantProjectHistory({
  applicantUserId,
}: {
  applicantUserId: bigint;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='my-8 flex flex-col items-center space-y-10'>
      <Button
        theme='black'
        tabIndex={0}
        onClickHandler={() => setIsOpen((prevState) => !prevState)}
      >
        프로젝트 이력 보기
      </Button>
      {isOpen && (
        <ApplicantProjectHistoryList
          isOpen={isOpen}
          applicantUserId={applicantUserId}
        />
      )}
    </div>
  );
}

export default ApplicantProjectHistory;
