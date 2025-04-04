import { ReactNode } from 'react';

function SettingTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className='my-6 font-semibold text-2xl mobile:text-lg py-2 border-b-2'>
      {children}
    </h1>
  );
}

export default SettingTitle;
