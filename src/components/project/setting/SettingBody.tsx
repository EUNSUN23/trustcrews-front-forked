import { ReactNode } from 'react';

function SettingBody({ children }: { children: ReactNode }) {
  return (
    <div className='w-full mx-auto grid pc:grid-cols-2 tablet:grid-cols-1 gap-10 place-content-between'>
      {children}
    </div>
  );
}

export default SettingBody;
