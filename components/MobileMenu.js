import Link from "next/link";

const MobileMenu = () => {
  return (
    <div className="p-2 md:hidden  bg-[#F2F4F8] w-screen   text-black">
      <div className="flex flex-col gap-3 justify-center items-center">
        <Link href="/">Home</Link>
        <Link href="/products">All Products</Link>
        <Link href="/categories">Categories</Link>
        
      </div>
    </div>
  );
};

export default MobileMenu;
