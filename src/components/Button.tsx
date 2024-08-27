import React, { memo } from "react";

function Button({ onClick, name }) {
//   console.log(onClick);
  return (
    <button
      className={
        name === `Done`
          ? `text-yellow-200 bg-gray-900 border border-solid w-24 py-2 rounded-lg transition-all duration-200 ease-in-out border-gray-900 hover:text-yellow-200 hover:bg-gray-900 hover:border-yellow-200
        `
          : `bg-yellow-200 text-gray-900 border border-solid w-24 py-2 rounded-lg transition-all duration-200 ease-in-out border-gray-900 hover:text-yellow-200 hover:bg-gray-900 hover:border-yellow-200`
      }
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default memo(Button);
