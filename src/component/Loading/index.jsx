import React from "react";

const Loading = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="flex justify-center items-center mt-4">
        <div className="w-8 h-8 border-4 border-[#8AAAE5] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  );
};

export default Loading;
