import React, { useContext } from "react";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import { CartContext } from "./CartContext";

const Featured = ({product}) => {

  const {addProduct}=useContext(CartContext)

  const  addFeaturedToCart=()=>{
    
    addProduct(product?._id)
  }
 
  return (
    <div style={{ background: "#222"}}>
      <Center>
        <div id="featured">
          <div id="featured-left">
            <h1 >{product.title}</h1>
            <p>
              One notable downside of a MacBook is that it's significantly more
              expensive than a PC laptop; however, Apple does offer an
              educational discount to any student that can reduce the computer's
              total price by 10% or more.
            </p>
            <div id="button-wrapper">
              <ButtonLink href={"/product/"+product._id} primary outline>
                Read More
              </ButtonLink>
              <div onClick={addFeaturedToCart}>

              <Button >
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
                Add to cart
              </Button>
              </div>
            </div>
          </div>
          <div id="featured-right">
            <img
              width="100%"
              src="https://images.unsplash.com/photo-1580522154071-c6ca47a859ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
            />
          </div>
        </div>
      </Center>
    </div>
  );
};

export default Featured;
