import Layout from "@/components/Layout";
import ProductBox from "@/components/ProductBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CategoryPage = ({ products, cat_name, id }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const res = axios
      .get("/api/category")
      .then((res) => setCategories(res.data));
  }, []);

  const router = useRouter();

  const handleCategory = (id) => {
    router.push("/singleCategoryProducts/" + id);
  };

  // console.log(id)
  return (
    <>
      <Layout>
        {/* see all categories name */}
        <div className="flex px-5 md:px-20 ">
          <h1 className="p-2 mt-5 text-lg border-4 shadow-xl border-black">
            Explore Available Categories
          </h1>
        </div>
        <div className="px-5 md:px-20 pt-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category) => (
            <div
              onClick={() => handleCategory(category._id)}
              className={`${
                category._id == id ? "bg-black text-white" : ""
              } border border-gray-400 cursor-pointer text-center rounded-xl py-1 px-2`}
            >
              {category?.name}
            </div>
          ))}
        </div>
        {/* <Center> */}
        <div
          id="categoryProducts-wrapper"
          className="flex flex-col md:flex-row gap-10 items-center py-10 px-5 md:px-20"
        >
          {/* Searched options */}
          <div
            id="search-options"
            className="hidden  min-w-[18rem] md:flex flex-col  self-start gap-1"
          >
            <div className="border-b-2 text-center py-3">
              <h1 className="text-xl text-left font-bold">Price Range</h1>
            </div>

            <div
              id="price-range"
              className="flex justify-between px-5 border-b-2 py-3"
            >
              <div className="border border-black px-3 py-1 rounded-sm">
                1000
              </div>
              <div className="border border-black py-1 px-3 rounded-sm">
                120000
              </div>
            </div>

            {/* Availability */}

            <div className="border-b-2 py-3 px-2">
              <h2 className="mb-2 font-bold">Availability</h2>
              <hr></hr>
              <div
                id="avaiabiltiy-options"
                className="mt-2 flex flex-col gap-4"
              >
                <div
                  id="availability-option"
                  className="flex items-center gap-2"
                >
                  <input className=" mb-0" type="checkbox" />{" "}
                  <label>In Stock</label>
                </div>
                <div
                  id="availability-option"
                  className="flex items-center gap-2"
                >
                  <input className=" mb-0" type="checkbox" />{" "}
                  <label>Pre Order</label>
                </div>
                <div
                  id="availability-option"
                  className="flex items-center gap-2"
                >
                  <input className="mb-0" type="checkbox" />{" "}
                  <label>Up Coming</label>
                </div>
              </div>
            </div>

            {/* brand options */}

            <div className="border-b-2 py-3 px-2">
              <h2 className="mb-2 font-bold">Brand</h2>
              <hr></hr>
              <div id="brand-options" className="mt-2 flex flex-col gap-4">
                <div id="brand-option" className="flex items-center gap-2">
                  <input className=" mb-0" type="checkbox" />{" "}
                  <label>Apple</label>
                </div>
                <div id="brand-option" className="flex items-center gap-2">
                  <input className="mb-0" type="checkbox" />{" "}
                  <label>Huwae</label>
                </div>
                <div id="brand-option" className="flex items-center gap-2">
                  <input className=" mb-0" type="checkbox" />{" "}
                  <label>Oppo</label>
                </div>
                <div id="brand-option" className="flex items-center gap-2">
                  <input className=" mb-0" type="checkbox" />{" "}
                  <label>Xiaomi</label>
                </div>
                <div id="brand-option" className="flex items-center gap-2">
                  <input className=" mb-0" type="checkbox" />{" "}
                  <label>Vivo</label>
                </div>
                <div id="brand-option" className="flex items-center gap-2">
                  <input className=" mb-0" type="checkbox" />{" "}
                  <label>SamSung</label>
                </div>
                <div id="brand-option" className="flex items-center gap-2">
                  <input className="mb-0" type="checkbox" />{" "}
                  <label>Google</label>
                </div>
                <div id="brand-option" className="flex items-center gap-2">
                  <input className=" mb-0" type="checkbox" />{" "}
                  <label>Motorolla</label>
                </div>
                <div id="brand-option" className="flex items-center gap-2">
                  <input className=" mb-0" type="checkbox" />{" "}
                  <label>Real me</label>
                </div>
                <div id="brand-option" className="flex items-center gap-2">
                  <input className=" mb-0" type="checkbox" />{" "}
                  <label>One Plus</label>
                </div>
              </div>
            </div>
          </div>

          {/* Searhced Result */}

          <div
            id="search-result"
            className="md:flex-grow self-start flex flex-col gap-5"
          >
            <div
              id="cat_name"
              className="px-3 py-2 bg-white border border-black rounded-md "
            >
              <h1 className="font-bold">{cat_name}</h1>
            </div>
            <div className="grid grid-cols-1  w-[100%] md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10 mt-5  md:p-0">
              {products.length > 0 ? (
                products.map((product) => <ProductBox product={product} />)
              ) : (
                <div className="text-2xl font-bold">No Products Available</div>
              )}
            </div>
          </div>
        </div>
        {/* </Center> */}
      </Layout>
    </>
  );
};

export default CategoryPage;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const category = await Category.findById(id);
  // console.log(category);
  const cat_name = category.name;
  // console.log("cat name", cat_name);
  const products = await Product.find({ category: id });
  // console.log("produss", products);

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      cat_name: JSON.parse(JSON.stringify(cat_name)),
      id: JSON.parse(JSON.stringify(id)),
    },
  };
}
