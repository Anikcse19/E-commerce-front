import Link from "next/link";
import React, { useContext } from "react";
import Center from "./Center";
import { CartContext } from "./CartContext";

const Header = () => {

  const {cartProducts}=useContext(CartContext)
  
  return (
    <div style={{backgroundColor:'#222',color:'white'}} >
      <Center>
        <div className="wrapper">
          <div id="logo">
            <Link href="/">E-Commerce</Link>
          </div>
          <nav>
            <Link href="/products">All Products</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/cart">My Cart ({cartProducts.length})</Link>
            <Link href="/account">Account</Link>
          </nav>
        </div>
      </Center>
    </div>
  );
};

export default Header;
