import FeaturedCategories from "@/components/FeaturedCategories";
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Layout from "@/components/Layout";
import Center from "@/components/Center";
import ProductCarousel from "@/components/Carousel/ProductCarousel";
import RequireAuth from "@/RequireAuth";

const HomePage = ({ product, newProducts }) => {
  // make a new array with all laptops
  const laptopProducts = [];
  newProducts.filter((product) => {
    if (product.category == "651b8cea5eeccc404e0be01a") {
      laptopProducts.push(product);
    }
  });

  // make a new array with all mobiles
  const mobilePorducts = [];
  newProducts.filter((product) => {
    if (product.category == "651b0ccc5cbaf886f380c84e") {
      mobilePorducts.push(product);
    }
  });

  // make a new array with all headphones
  const headPhonesProducts = [];
  newProducts.filter((product) => {
    if (product.category == "651b8cf25eeccc404e0be01e") {
      headPhonesProducts.push(product);
    }
  });

  //  make top selling products array
  const topSellingProducts = [
    laptopProducts[2],
    mobilePorducts[0],
    headPhonesProducts[1],
    laptopProducts[1],
    headPhonesProducts[0],
  ];

  console.log(newProducts);

  return (
    <Layout>
      <Featured products={newProducts} />
      <FeaturedCategories />
      <NewProducts newProducts={newProducts} />

      <Center>
        {/* Show top sell */}
        <div className="mt-10">
          <p className="text-base md:text-lg lg:text-xl tracking-widest text-[#7C00FE] font-bold">
            TOP SELLING PRODCUTS
          </p>
          {/* all laptops slider */}
          <div className="mt-5">
            <ProductCarousel from="top-sell" products={topSellingProducts} />
          </div>
        </div>

        {/* Show all Laptops */}
        <div className="mt-10">
          <p className="text-base md:text-lg lg:text-xl tracking-widest text-[#7C00FE] font-bold">
            LAPTOPS
          </p>
          {/* all laptops slider */}
          <div className="mt-5">
            <ProductCarousel from="all-laptop" products={laptopProducts} />
          </div>
        </div>

        {/* Show all Mobiles */}
        <div className="mt-10">
          <p className="text-base md:text-lg lg:text-xl tracking-widest text-[#7C00FE] font-bold">
            SMART PHONES
          </p>
          {/* all laptops slider */}
          <div className="mt-5">
            <ProductCarousel form="all-mobiles" products={mobilePorducts} />
          </div>
        </div>

        {/* Show all Headphone */}
        <div className="mt-10">
          <p className="text-base md:text-lg lg:text-xl tracking-widest text-[#7C00FE] font-bold">
            HEADPHONES
          </p>
          {/* all laptops slider */}
          <div className="mt-5">
            <ProductCarousel
              from="all-headphones"
              products={headPhonesProducts}
            />
          </div>
        </div>
      </Center>
    </Layout>
  );
};
export default HomePage;

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
