// components/Style.js
import React from "react";

const Style = ({ style }) => {
  return (
    <div className="p-2 bg-white rounded mb-2 shadow cursor-pointer">
      {style.name}
    </div>
  );
};

export default Style;
