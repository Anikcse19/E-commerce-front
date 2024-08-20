import Link from "next/link";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "./CartContext";
import ReactStars from "react-rating-stars-component";
import { Rating } from "@mui/material";

const ProductBox = ({ product }) => {
  const [isHover, setIsHover] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const { addProduct, addFavourite, removeFavourite } = useContext(CartContext);

  console.log("product", product?.rating);

  return (
    <div
      id="product-box"
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      class="relative z-[1] w-[90%] mx-auto  md:w-[100%] bg-white border border-gray-400 rounded-md p-2"
    >
      <Link href={"/product/" + product?._id}>
        {/* <img
          class=" flex justify-center rounded-t-lg w-[300px] h-[300px]"
          // src="https://www.zdnet.com/a/img/resize/2a46b0d5f3617212b5cba28ad5abb06537d99886/2023/10/03/32355104-4543-4c66-ba04-8aaa13d7ffe6/google-pixel-8-pro-blue-in-hand.jpg?auto=webp&fit=crop&height=360&width=640"
          src={product?.url}
          alt=""
        /> */}
        <div className=" rounded-t-lg flex justify-center items-center overflow-hidden p-3  w-[100%] bg-cover ">
          <img
            className="w-90% h-[220px]"
            // src="https://images.unsplash.com/photo-1580522154071-c6ca47a859ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
            src={product?.url}
          />
        </div>
      </Link>

      <div class="flex flex-col gap-2 px-5">
        <h5 class="text-base font-bold">{product.title}</h5>
        <p className="text-gray-500 text-xs ">{`${product.description.slice(
          0,
          100
        )}...`}</p>
        <div className="flex items-center gap-3">
          <span>&#2547; {product?.price}</span>
          <span className="text-gray-400">
            {" "}
            {product?.discount ? ` - ${product.discount}` : "- 60%"}
          </span>
        </div>

        <div>
          <Rating
            name="half-rating-read"
            defaultValue={product?.rating ? product.rating : 3.5}
            precision={0.5}
            readOnly
          />
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
