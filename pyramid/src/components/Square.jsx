import React from 'react';

const Square = ({ value, onClick }) => {
  return (
    <button
      className="w-16 h-16 bg-gray-200 flex items-center justify-center text-2xl font-bold border border-gray-400 rounded-md transition duration-300 ease-in-out hover:bg-gray-300 focus:outline-none"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
