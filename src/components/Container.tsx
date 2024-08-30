import React from "react";

function Container({ children }) {
  return (
    <div className="flex items-center justify-center h-screen gap-6 flex-col bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      {children}
    </div>
  );
}

export default Container;
