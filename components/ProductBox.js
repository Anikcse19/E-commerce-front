import React, { useContext, useState } from "react";
import Button from "./Button";
import Link from "next/link";
import { CartContext } from "./CartContext";

const ProductBox = ({ product }) => {

  const [isHover,setIsHover]=useState(false)

  const {addProduct}=useContext(CartContext)

  console.log(isHover)
  return (
    <div id="product-box" onMouseEnter={()=>{setIsHover(true)}} onMouseLeave={()=>{setIsHover(false)}} style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset"}} class="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
      <Link href={"/product/" + product._id}>
        {/* <img
          class=" flex justify-center rounded-t-lg w-[300px] h-[300px]"
          // src="https://www.zdnet.com/a/img/resize/2a46b0d5f3617212b5cba28ad5abb06537d99886/2023/10/03/32355104-4543-4c66-ba04-8aaa13d7ffe6/google-pixel-8-pro-blue-in-hand.jpg?auto=webp&fit=crop&height=360&width=640"
          src={product?.url}
          alt=""
        /> */}
        <div className=" rounded-t-lg flex justify-center items-center overflow-hidden p-3  min-w-[200px] bg-cover ">
        <img
              className="w-[180px] h-[200px]"
              // src="https://images.unsplash.com/photo-1580522154071-c6ca47a859ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
              src={product?.url}
            />""
        
                </div>
      </Link>
      <div class="p-5 flex flex-col justify-between">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-black ">
            {product.title}
          </h5>
        </a>
       <div className="h-10">
       {/* {
        isHover && ( */}
          <div className="relative flex flex-row justify-between items-center">
          <a
            href="#" id="price-icon"
            class="absolute top-5 right-0  inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg  focus:ring-4 focus:outline-none "
          >
            ${product.price}
          </a>
          <button onClick={()=>addProduct(product._id)}
            href="" id="cart-icon"
            class="absolute top-5 left-9 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 "
          >
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
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
        </div>
        {/* )
       } */}

       </div>
      </div>
    </div>
  );
};

export default ProductBox;
