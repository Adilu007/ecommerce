import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Clickable Backdrop */}
      <div 
        className="absolute inset-0 pointer-events-auto"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 max-h-[90vh] overflow-y-auto pointer-events-auto">
        {children}
      </div>
    </div>
  );
};

export default Modal;