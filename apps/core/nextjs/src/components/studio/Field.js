// components/Field.js
import React from "react";

const Field = ({ field }) => {
  return <div className="p-2 bg-white rounded mb-2 shadow">{field.name}</div>;
};

export default Field;
