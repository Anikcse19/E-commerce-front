import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Center from "./Center";
import { CartContext } from "./CartContext";
// import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import FavouriteModal from "./FavouriteModal";
import { set } from "mongoose";
import axios from "axios";

const Header = () => {
  const { cartProducts, favouriteProducts } = useContext(CartContext);
  const [showModal,setShowModal]=useState(false)
  const [favourites,setFavourites]=useState([])

  useEffect(()=>{
    axios.post('/api/cart/',{ids:favouriteProducts}).then(res=>setFavourites(res.data))

  },[favouriteProducts])

  

  // const {data:session}=useSession()
  const router = useRouter();

  return (
    <>
    <div
      style={{
        marginTop: "2px",
        backgroundColor: "#F2F4F8",
        color: "black",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
      }}
    >
      <Center>
        <div className="wrapper">
          <div id="logo">
            <Link href="/">EasyTech</Link>
          </div>
          <nav className="text-black">
            <Link href="/products">All Products</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/cart" className="flex relative">
              <div className="bg-black text-white rounded-[50%] p-1 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
              <span className="absolute w-6 h-6 rounded-[50%] text-center -top-2 -mt-1 -right-2 bg-black text-white  font-bold text-base">
                {cartProducts?.length}
              </span>
            </Link>
            <Link href="" className="flex relative" onClick={()=>setShowModal(true)}>
              <div className="bg-black text-white rounded-[50%] p-1 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
              <span className="absolute w-6 h-6 rounded-[50%] text-center -top-2 -mt-1 -right-2 bg-black text-white  font-bold text-base">
                {favouriteProducts?.length}
              </span>
            </Link>
           
              
          
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
    <FavouriteModal  isVisible={showModal} favourites={favourites} setShowModal={setShowModal}/>
    
    </>
  );
};

export default Header;
