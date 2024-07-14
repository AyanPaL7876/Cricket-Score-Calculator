import React from 'react';

const DisplayButton = ({ title, options, isMatchEnd, onClick }) => {
  return (
    <div>
      <h2 className="text-xl text-black font-bold">{title} :- </h2>
      <div className="grid grid-cols-3 w-full gap-4 justify-between">
        {options.map((option) => (
          <button
            key={option.label}
            type="button"
            disabled={isMatchEnd}
            onClick={() => onClick(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DisplayButton;
