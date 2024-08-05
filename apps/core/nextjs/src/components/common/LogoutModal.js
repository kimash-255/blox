import React from "react";
import Modal from "react-modal";

const LogoutModal = ({ isOpen, onRequestClose, onConfirm }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "1rem",
      padding: "2rem",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Logout Modal"
    >
      <h2 className="text-lg font-semibold">Confirm Logout</h2>
      <p className="mt-2 text-sm">Are you sure you want to log out?</p>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onRequestClose}
          className="mr-4 px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>
    </Modal>
  );
};

export default LogoutModal;
