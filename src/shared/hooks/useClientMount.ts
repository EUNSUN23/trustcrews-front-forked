'use client';

import { useEffect, useState } from 'react';

const useClientMount = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

export default useClientMount;
