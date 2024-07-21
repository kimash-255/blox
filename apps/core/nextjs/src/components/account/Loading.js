import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="space-x-2 flex">
        <div
          className="w-4 h-4 bg-red-500 rounded-full animate-blink"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-4 h-4 bg-yellow-500 rounded-full animate-blink"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-4 h-4 bg-green-500 rounded-full animate-blink"
          style={{ animationDelay: "0.4s" }}
        ></div>
        <div
          className="w-4 h-4 bg-blue-500 rounded-full animate-blink"
          style={{ animationDelay: "0.6s" }}
        ></div>
        <div
          className="w-4 h-4 bg-purple-500 rounded-full animate-blink"
          style={{ animationDelay: "0.8s" }}
        ></div>
      </div>
    </div>
  );
};

export default Loading;
