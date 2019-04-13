import React from 'react';

const QuestionMarkIcon = ({ size }: { size?: string }) => {
  return (
    <svg
      width={size || '45'}
      height={size || '45'}
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.75 28H29.775L29.075 27.325C31.525 24.475 33 20.775 33 16.75C33 7.775 25.725 0.5 16.75 0.5C7.775 0.5 0.5 7.775 0.5 16.75C0.5 25.725 7.775 33 16.75 33C20.775 33 24.475 31.525 27.325 29.075L28 29.775V31.75L40.5 44.225L44.225 40.5L31.75 28ZM16.75 28C10.525 28 5.5 22.975 5.5 16.75C5.5 10.525 10.525 5.5 16.75 5.5C22.975 5.5 28 10.525 28 16.75C28 22.975 22.975 28 16.75 28Z"
        fill="white"
      />
    </svg>
  );
};

export default QuestionMarkIcon;
