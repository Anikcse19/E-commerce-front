import React, { useEffect, useState } from "react";
import Center from "./Center";
// import mongoose from "mongoose";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import axios from "axios";
import CategoryBox from "./CategoryBox";

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const res = axios
      .get("/api/category")
      .then((res) => setCategories(res.data));
  }, []);

  console.log("category", categories);
  return (
    <div className=" py-10" style={{ backgroundColor: "#F2F4F8" }}>
      <Center>
        <div className=" text-center mb-6">
          <h1 className="font-extrabold text-2xl">Featured Category</h1>
          <h4>Get Your Desired Product from Featured Category!</h4>
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
