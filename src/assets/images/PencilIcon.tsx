import React from 'react';

const PencilIcon = ({ size }: { size?: string }) => {
  return (
    <svg
      width={size || '49'}
      height={size || '49'}
      viewBox="0 0 49 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.125 38.7187V48.875H10.2812L40.2354 18.9208L30.0792 8.76458L0.125 38.7187ZM48.0896 11.0667C49.1458 10.0104 49.1458 8.30417 48.0896 7.24792L41.7521 0.910416C40.6958 -0.145834 38.9896 -0.145834 37.9333 0.910416L32.9771 5.86667L43.1333 16.0229L48.0896 11.0667Z"
        fill="white"
      />
    </svg>
  );
};

export default PencilIcon;
