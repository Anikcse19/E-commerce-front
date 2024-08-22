import FeaturedCategories from "@/components/FeaturedCategories";
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Layout from "@/components/Layout";
import Center from "@/components/Center";
import ProductCarousel from "@/components/Carousel/ProductCarousel";

export default function HomePage({ product, newProducts }) {
  // make a new array with all laptops
  const laptopProducts = [];
  newProducts.filter((product) => {
    if (product.category == "651b8cea5eeccc404e0be01a") {
      laptopProducts.push(product);
    }
  });

  return (
    <Layout>
      <Featured products={newProducts} />
      <FeaturedCategories />
      <NewProducts newProducts={newProducts} />
      {/* Show all Laptops */}
      <Center>
        <div className="mt-10">
          <p className="text-base md:text-lg lg:text-xl tracking-widest text-[#7C00FE] font-bold">
            LAPTOPS
          </p>
          {/* all laptops slider */}
          <div>
            <ProductCarousel products={laptopProducts} />
          </div>
        </div>
      </Center>
    </Layout>
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
  // console.log(newProducts);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
