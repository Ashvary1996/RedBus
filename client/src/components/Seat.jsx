import React from "react";

const Seat = ({ number, isSelected, onSelect }) => {
  const seatColor = isSelected ? "bg-green-500" : "bg-gray-200";

  return (
    <button
      className={`w-16 h-16 mr-4 mb-4 rounded-lg border border-gray-300 ${seatColor}`}
      onClick={() => onSelect(number)}
    >
      {number}
    </button>
  );
};

export default Seat;
