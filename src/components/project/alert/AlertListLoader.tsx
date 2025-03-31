import React from 'react';
import Loader from '@/components/ui/Loader';

function AlertListLoader() {
  return (
    <div className='flex w-full h-full'>
      <Loader size='md' />
    </div>
  );
}

export default AlertListLoader;
