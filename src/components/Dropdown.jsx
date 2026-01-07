import React from "react";

const Dropdown = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay to close on outside click */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Dropdown */}
      <div
        className="absolute right-0 top-9 w-40 bg-[#1a1a1a]
        border border-gray-700 rounded-xl shadow-xl
        overflow-hidden z-50"
      >
        {children}
      </div>
    </>
  );
};

export default Dropdown;
