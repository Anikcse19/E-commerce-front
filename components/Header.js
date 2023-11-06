import Link from "next/link";
import React, { useContext } from "react";
import Center from "./Center";
import { CartContext } from "./CartContext";
// import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Header = () => {

  const {cartProducts}=useContext(CartContext)

  // const {data:session}=useSession()
  const router=useRouter()
  
  return (
    <div style={{marginTop:'2px',backgroundColor:'#F2F4F8',color:'black', boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"}} >
      <Center>
        <div className="wrapper">
          <div id="logo">
            <Link href="/">E-Commerce</Link>
          </div>
          <nav className="text-black">
            <Link href="/products">All Products</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/cart">My Cart ({cartProducts.length})</Link>
            <Link href="/account">Account</Link>
            {/* <p>{session?.user?.name}</p>
            {
              session && (
                <button onClick={()=>{
                  signOut()
                  router.push('/login')
                }}>Logout</button>
              )
            } */}
          </nav>
        </div>
      </Center>
    </div>
  );
};

export default Header;
