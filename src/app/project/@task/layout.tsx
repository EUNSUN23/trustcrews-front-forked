import React, { ReactNode } from 'react';

function ProjectTaskLayout({ children }: { children: ReactNode }) {
  return (
    <section className='w-full tablet:px-2 flex flex-col justify-between space-y-[6rem]'>
      {children}
    </section>
  );
}

export default ProjectTaskLayout;
