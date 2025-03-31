import { ReactNode } from 'react';

function CrewProfileItem({
  label,
  contents,
}: {
  label: string;
  contents: ReactNode;
}) {
  return (
    <div className='pc:h-[50px] tablet:mx-8 flex items-center justify-around mobile:space-x-4'>
      <span className='tablet:w-[200px] tablet:text-[1.2rem] font-medium text-geryDarkBlue'>
        {label}
      </span>
      <div className='min-w-[100px] flex justify-center grow-0 mx-auto'>
        {contents}
      </div>
    </div>
  );
}

export default CrewProfileItem;
