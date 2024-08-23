import Link from "next/link";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "./CartContext";
import ReactStars from "react-rating-stars-component";
import { Rating } from "@mui/material";
import { useRouter } from "next/router";

const ProductBox = ({ product, from }) => {
  const [isHover, setIsHover] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const router = useRouter();

  const { addProduct, addFavourite, removeFavourite } = useContext(CartContext);

  return (
    <div
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      class="relative z-[1] w-[100%]  border border-gray-400 rounded-md  group"
    >
      <div
        onClick={() => {
          router.push(`/product/${product?._id}`);
        }}
      >
        {/* product image */}
        <div className="group-hover:scale-110  transition-all duration-300 rounded-t-lg flex justify-center items-center overflow-hidden p-1 md:p-2 lg:p-3  w-[100%] bg-cover ">
          <img
            className="w-90% h-[100px] md:h-[150px] lg:h-[220px]"
            src={product?.url}
          />
        </div>
      </div>

      <div class="flex flex-col gap-2 py-2 px-2 md:px-3 lg:px-5">
        <div className="flex items-center gap-4">
          <h5 class="text-[10px] sm:text-sm font-bold group-hover:text-[#7C00FE] group-hover:scale-105 transition-all duration-300 ease-out">
            {product?.title}
          </h5>
        </div>
        <p className="text-gray-500 text-xs hidden lg:block">{`${product?.description.slice(
          0,
          100
        )}...`}</p>
        <p className="text-gray-500 text-[8px] sm:text-xs block lg:hidden">{`${product?.description.slice(
          0,
          30
        )}...`}</p>
        <div className="flex items-center gap-3">
          <span className="group-hover:text-[#7C00FE] font-bold text-xs md:text-sm lg:text-base">
            &#2547; {product?.price}
          </span>
          <span className="text-red-600 animate-pulse text-xs md:text-sm lg:text-base">
            {" "}
            {product?.discount ? ` - ${product?.discount}` : "- 60%"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <Rating
            className="text-xs md:text-sm lg:text-base"
            name="half-rating-read"
            defaultValue={product?.rating ? product?.rating : 3.5}
            precision={0.5}
            readOnly
          />
          {from == "top-sell" && (
            <p className="bg-red-600 font-bold p-1 md:p-2 text-center text-white rounded-full text-[8px] md:text-xs animate-bounce">
              Top Sell
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductBox;

// {
//   /* add favourites */
// }
// <div className="mt-2">
//   {isFavourite ? (
//     <div
//       onClick={() => {
//         removeFavourite(product._id);
//         setIsFavourite(!isFavourite);
//         toast.success("Remove from favourites");
//       }}
//       className="cursor-pointer flex justify-end"
//     >
//       <p className="bg-black text-white px-5 py-1 rounded">
//         Added to Favourite
//       </p>
//     </div>
//   ) : (
//     <div>
//       <div
//         onClick={() => {
//           addFavourite(product._id);
//           setIsFavourite(!isFavourite);
//           toast.success("Added to favourites");
//         }}
//         className="cursor-pointer"
//       >
//         <p className="border border-black px-5 rounded">Add to Favourite</p>
//       </div>
//       <Toaster position="bottom-right" reverseOrder={false} />
//     </div>
//   )}
// </div>;
