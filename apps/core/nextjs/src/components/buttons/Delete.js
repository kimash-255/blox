import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DeleteButton = ({ className }) => {
  return (
    <div
      className={`inline-block px-3 py-2 mb-0 font-bold text-center uppercase align-middle transition-all border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 bg-fuchsia-500 text-white hover:opacity-75 ${className}`}
    >
      <FontAwesomeIcon icon={faTrash} />
    </div>
  );
};

export default DeleteButton;
