import Link from "next/link";
import React from "react";

const MobileMenu = () => {
  return (
    <div className="p-2 bg-white w-screen h-screen  text-black">
      <h1 className="text-center">EasyTech</h1>
      <div className="flex flex-col gap-3 ">
        <Link href="/">Home</Link>
        <Link href="/products">All Products</Link>
        <Link href="/categories">Categories</Link>
        <Link href="/account">Account</Link>
      </div>
    </div>
  );
};

export default MobileMenu;
