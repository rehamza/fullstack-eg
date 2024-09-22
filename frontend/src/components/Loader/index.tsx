import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-20">
      <div className="w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
    </div>
  );
}
