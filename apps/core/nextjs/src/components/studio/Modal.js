import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ onClose, children, title }) => {
  // Handle click outside modal content
  const handleOverlayClick = (e) => {
    // Close the modal if the overlay (background) is clicked
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 w-full h-screen"
      onClick={handleOverlayClick} // Add click handler to overlay
    >
      <div
        className="bg-white rounded-lg shadow-xl transform transition-all w-[80vw] h-[80vh] overflow-auto"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        <div className="py-4 px-4 flex justify-between items-center border-b">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="inline-block px-4 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 border-fuchsia-500 text-fuchsia-500 hover:opacity-75"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
