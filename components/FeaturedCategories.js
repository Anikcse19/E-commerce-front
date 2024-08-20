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

  // const categories=[

  //   {
  //     id:1,
  //     title:'Mobile',
  //     icon:FaMobileAlt
  //   },
  //   {
  //     id:2,
  //     title:'Laptops',
  //     icon:GiLaptop
  //   },
  //   {
  //     id:3,
  //     title:'Headphones',
  //     icon:FaHeadphones
  //   },
  //   {
  //     id:4,
  //     title:'TV',
  //     icon:PiTelevision
  //   },
  //   {
  //     id:5,
  //     title:'Smart Watch',
  //     icon:FiWatch
  //   },
  //   {
  //     id:6,
  //     title:'Gaming Console',
  //     icon:GiConsoleController
  //   },
  //   {
  //     id:7,
  //     title:'Drone',
  //     icon:TbDrone
  //   },
  //   {
  //     id:8,
  //     title:'Printer',
  //     icon:TiPrinter
  //   },
  //   {
  //     id:9,
  //     title:'CC Camera',
  //     icon:GiCctvCamera
  //   },
  //   {
  //     id:10,
  //     title:'Battery For Laptop',
  //     icon:FaCarBattery
  //   },
  // ]

  // console.log("category", categories);
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
