import React from "react";

export const CardProfile = ({ text, pts, children }) => {
  return (
    <div className="p-4 max-w-[17rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center space-x-5">
      {children}
      <div>
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {pts}
        </h5>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
          {text}
        </p>
      </div>
    </div>
  );
};
