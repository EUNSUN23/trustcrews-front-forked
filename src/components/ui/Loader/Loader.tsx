import React from 'react';

function Loader({ size }: { size: string }) {
  let sizeStyle: string;
  switch (size) {
    case 'sm':
      sizeStyle = 'border-t-[3px] border-[3px] w-[25px] h-[25px]';
      break;
    case 'lg':
      sizeStyle = 'border-t-[9px] border-[9px] w-20 h-20';
      break;
    default:
      sizeStyle = 'border-t-[6px] border-[6px] w-16 h-16';
  }

  return (
    <div
      className={`m-auto ease-linear rounded-full border-t-blue-500 border-solid ${sizeStyle} animate-spin`}
    ></div>
  );
}

export default Loader;
