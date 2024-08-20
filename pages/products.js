import AllProducts from "@/components/AllProducts";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import React from "react";

const productsPage = ({ products }) => {
  return (
    <>
      <Layout>
        <AllProducts products={products} />
      </Layout>
    </>
  );
};

export default productsPage;

export async function getServerSideProps() {
  await mongooseConnect();
  const productsDoc = await Product.find({}, null, {
    sort: { _id: -1 },
  });

  // console.log(productsDoc);

  return {
    props: {
      products: JSON.parse(JSON.stringify(productsDoc)),
    },
  };
}
