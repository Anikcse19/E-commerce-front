import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import { useRouter } from "next/router";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  background-color: #f3eff9;
  width: 8rem;
`;
const Price = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 2px;
`;

const SingleProductDetails = ({ product }) => {
  const router = useRouter();

  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <img src={product?.url} />
            <div className="flex items-center gap-2 m-4">
              <div
                onClick={() => removeProduct(product._id)}
                id="decrease-button"
              >
                -
              </div>
              <span>
                {cartProducts.filter((id) => id === product._id).length}
              </span>
              <div onClick={() => addProduct(product._id)} id="increase-button">
                +
              </div>
            </div>
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <PriceRow>
              <div>
                <span>Price: </span>
                <Price>${product.price}</Price>
              </div>
            </PriceRow>
            <div className="mt-5">
              <h2 className="underline font-semibold">Description</h2>
              <p>{product.description}</p>
            </div>

            <div onClick={() => router.push("/cart")}>
              <button className="bg-black text-white mt-10 px-3 py-1 rounded-md ">
                Buy Now
              </button>
            </div>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
};

export default SingleProductDetails;

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  console.log(product);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
