import { useRouter } from "next/router";
import { FaCarBattery, FaHeadphones, FaMobileAlt } from "react-icons/fa";

import { FiWatch } from "react-icons/fi";
import { GiCctvCamera, GiConsoleController, GiLaptop } from "react-icons/gi";
import { PiTelevision } from "react-icons/pi";
import { TbDrone } from "react-icons/tb";
import { TiPrinter } from "react-icons/ti";

const CategoryBox = ({ category }) => {
  const router = useRouter();

  const handleCategory = (category, id) => {
    router.push("/singleCategoryProducts/" + id);
  };

  return (
    <div
      title="Click to show all products"
      onClick={() => handleCategory(category, category._id)}
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
      }}
      className="bg-white rounded-md cursor-pointer border border-slate-950 col-span-1 text-center px-3 py-9 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2">
          {
            category.name=="Mobiles" ? <FaMobileAlt className="text-[40px] font-bold"/> : category.name=="Laptops" ? <GiLaptop className="text-[40px] font-bold"/>:category.name=="Headphone" ? <FaHeadphones className="text-[40px] font-bold"/>:category.name=="TV"?<PiTelevision className="text-[40px] font-bold"/>:category.name=="Smart Watch"?<FiWatch className="text-[40px] font-bold"/>:category.name=="Gamming Console"?<GiConsoleController className="text-[40px] font-bold"/>:category.name=="Drone"?<TbDrone className="text-[40px] font-bold"/>:category.name=="Printer"?<TiPrinter className="text-[40px] font-bold"/>:category.name=="CC Camera"?<GiCctvCamera className="text-[40px] font-bold"/>:category.name=="Battery For Laptop"?<FaCarBattery className="text-[40px] font-bold"/>:""

          }

      <h1>{category.name}</h1>
        </div>
    </div>
  );
};

export default CategoryBox;
