import React from "react";

interface ButtonProps {
  readonly text: string;
  readonly onClick?: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      type="submit"
      className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
