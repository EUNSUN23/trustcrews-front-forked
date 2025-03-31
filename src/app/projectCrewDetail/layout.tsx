import { ReactNode } from 'react';

function ProjectCrewDetailLayout({ children }: { children: ReactNode }) {
  return (
    <section className='flex-col justify-center mx-auto tablet:mt-[2rem] tablet:pt-[1.5rem] tablet:px-[1.5rem] pb-[5rem]'>
      {children}
    </section>
  );
}

export default ProjectCrewDetailLayout;
