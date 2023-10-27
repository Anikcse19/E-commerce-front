import React from "react";
import Center from "./Center";
import ProductBox from "./ProductBox";

const AllProducts = ({products}) => {
  return (
    <Center>
      <h2 className="mt-6 text-3xl tracking-wider font-extrabold">
        All Products
      </h2>
      <div id="new-products">
        {
           products.length>0 && products.map(product=>(
                <ProductBox product={product}/>
            ))
        }
      </div>
    </Center>
  );
};

export default AllProducts;
