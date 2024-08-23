import Center from "./Center";
// import mongoose from "mongoose";

import axios from "axios";
import { useEffect, useState } from "react";
import CategoryBox from "./CategoryBox";

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const res = axios
      .get("/api/category")
      .then((res) => setCategories(res.data));
  }, []);

  return (
    <div className=" py-10" style={{}}>
      <Center>
        <div className=" text-center mb-6">
          <h1 className="font-extrabold text-2xl">Featured Category</h1>
          <h4 className="text-[#7C00FE]">
            Get Your Desired Product from Featured Category!
          </h4>
        </div>
        <div id="all-categories">
          {categories.map((category) => (
            <CategoryBox key={category._id} category={category} />
          ))}
        </div>
      </Center>
    </div>
  );
};

export default FeaturedCategories;

// export async function getServerSideProps(){
//     await mongooseConnect()
//     const categories = await Category.find({});
//     console.log('categoryss',categories)

//     return{
//         props:{
//             category:JSON.parse(JSON.stringify(categories))
//         }
//     }
// }
