import FeaturedCategories from "@/components/FeaturedCategories";
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Layout from "@/components/Layout";

export default function HomePage({ product, newProducts }) {
  console.log(product);
  return (
    <div>
      <Layout>
        <Featured product={product} />
        <FeaturedCategories />
        <NewProducts newProducts={newProducts} />
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "651b8d5f5eeccc404e0be069";
  await mongooseConnect();
  const product = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  console.log(newProducts);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
