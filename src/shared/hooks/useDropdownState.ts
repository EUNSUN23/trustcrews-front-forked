import { useEffect, useRef, useState } from 'react';

const useDropdownState = <T extends HTMLElement>() => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<T | null>(null);

  const handleDocumentClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return { openDropdown, setOpenDropdown, dropdownRef };
};

export default useDropdownState;
