import Link from "next/link";
import React from "react";

const ButtonLink = (rest) => {
  return (
    <Link
      {...rest}
      className={`bg-blue-400 flex items-center justify-center gap-1 text-black px-10 text-center py-2 rounded-sm cursor-pointer ${
        rest.primary ? "text-white" : "text-blue"
      } ${rest.outline ? "border border-blue-900 bg-transparent" : ""}`}
    />
  );
};

export default ButtonLink;
