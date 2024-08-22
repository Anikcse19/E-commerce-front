import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import { Rating } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";
import "swiper/css";
import { FaRegHeart } from "react-icons/fa6";
import { IoIosHeart } from "react-icons/io";
import { IoMdShare } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductBox from "@/components/ProductBox";
import Cookies from "js-cookie";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

const Price = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 2px;
`;
// const notify = () => toast.success('Review Added');
const SingleProductDetails = ({ products }) => {
  const {
    cartProducts,
    addProduct,
    removeProduct,
    addFavourite,
    removeFavourite,
  } = useContext(CartContext);
  const [review, setReview] = useState({});
  const [comment, setComment] = useState("");
  const [product, setProduct] = useState({});
  const [isFavourite, setIsFavourite] = useState(false);
  const router = useRouter();
  const user = Cookies.get("user") && JSON.parse(Cookies.get("user"));

  const { id } = router.query;

  const fetchProduct = () => {
    if (id) {
      axios.get("/api/products?id=" + id).then((res) => {
        setProduct(res?.data);
      });
    } else {
      return;
    }
  };

  console.log(products, "fff");

  let matchedProducts = [];
  products.filter((p) => {
    if (p.category === product.category) {
      matchedProducts.push(p);
    }
  });

  console.log(matchedProducts, "match");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const updateProductWithReview = async () => {
    const data = {
      _id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      properties: product.properties,
      url: product.url,
      review,
    };
    const rev = {
      comment: comment,
      userName: user?.name,
    };

    console.log(rev, "rev");

    if (comment == "") return;
    await axios
      .post("/api/products/", {
        _id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        properties: product.properties,
        url: product.url,
        review: rev,
      })
      .then(async (res) => {
        if (res.status == 200) {
          setComment("");
          fetchProduct();
          toast.success("Review Added");
        } else {
          toast.error("Error");
        }
      });
  };

  return (
    <>
      <Layout>
        <Center>
          <ColWrapper>
            <WhiteBox>
              <div
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
                className="hover:scale-110 transition-all duration-500 ease-out cursor-pointer rounded flex items-center justify-center"
              >
                <img
                  src={product?.url}
                  alt="product_image"
                  className="w-[90%] h-[250px]"
                />
              </div>
              <div className="flex items-center gap-2 m-4">
                <p className="animate-pulse">In Stock</p>
                <p>(Only 15 Items left)</p>
              </div>
            </WhiteBox>
            <div className="p-2">
              {/* title and favrt */}
              <div className="flex items-center justify-between">
                <p className="text-base md:text-lg lg:text-xl text-blue-500 font-bold">
                  {product?.title}
                </p>
                <div className="flex items-center gap-5">
                  {/* share */}
                  <IoMdShare className="text-base md:text-lg lg:text-xl" />
                  {/* favourites icon */}
                  <div>
                    {isFavourite ? (
                      <div
                        onClick={() => {
                          removeFavourite(product._id);
                          setIsFavourite(!isFavourite);
                          toast.success("Remove from favourites");
                        }}
                        className="cursor-pointer flex justify-end"
                      >
                        <IoIosHeart className="text-base md:text-lg lg:text-xl" />
                      </div>
                    ) : (
                      <div>
                        <div
                          onClick={() => {
                            addFavourite(product._id);
                            setIsFavourite(!isFavourite);
                            toast.success("Added to favourites");
                          }}
                          className="cursor-pointer"
                        >
                          <FaRegHeart className="text-base md:text-lg lg:text-xl" />
                        </div>
                        <Toaster position="bottom-right" reverseOrder={false} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* price and discount */}
              <div className="flex items-center gap-5">
                <div>
                  <span>Price: </span>
                  <span className="font-bold text-sm md:text-lg">
                    &#2547;{product?.price}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Discount: </span>
                  <span className=" text-gray-400 text-sm md:text-lg">
                    {product?.discount}
                  </span>
                </div>
              </div>

              {/* reviews and ratings */}
              <div className="flex items-center gap-4 mt-3">
                <Rating
                  name="half-rating-read"
                  value={product && product?.rating ? product.rating : 3.5}
                  precision={0.5}
                  readOnly
                />
                <p
                  onClick={() => {
                    router.push("#reviews");
                  }}
                  className="hover:underline cursor-pointer"
                >
                  (15 Reviews)
                </p>
              </div>

              {/* description */}
              <div className="mt-3">
                <h2 className="underline font-semibold">Description</h2>
                <p className="text-sm md:text-base text-gray-400">
                  {product.description}
                </p>
              </div>

              {/* buy and add to cart button */}
              <div className="flex items-center gap-5 mt-10">
                <div onClick={() => router.push("/cart")}>
                  <button
                    onClick={() => {
                      const a = cartProducts?.find((c) => c === product._id);
                      if (a === product?._id) {
                        router.push("/cart");
                      } else {
                        addProduct(product._id);
                        router.push("/cart");
                      }
                    }}
                    className="bg-black hover:bg-slate-600 text-white  px-3 py-1 rounded-md "
                  >
                    Buy Now
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      const a = cartProducts?.find((c) => c === product._id);
                      if (a === product?._id) {
                        toast("Already added");
                      } else {
                        addProduct(product._id);
                      }
                    }}
                    className="border-2 border-black hover:bg-black text-black hover:text-white px-3 py-1 transition-all duration-1000 ease-out rounded-md "
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </ColWrapper>

          {/* delivery details */}
          <div className="p-2">
            <p className="text-base md:text-lg lg:text-xl font-bold">
              Delivery Options:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 gap-3">
              <span className="text-base md:text-xl">
                Location:{" "}
                <p className="text-sm md:text-lg">Chittagong, Bangladesh</p>
                <div className="flex p-2">
                  <p className="text-sm bg-red-600 px-4 cursor-pointer rounded-md text-white py-1">
                    Change location
                  </p>
                </div>
              </span>
              <span className="text-base md:text-xl">
                Estimated delivery fee:{" "}
                <p className="text-sm md:text-lg text-red-600 font-bold">
                  &#2547; 60
                </p>
              </span>
              <span className="text-base md:text-xl">
                Payment Process:{" "}
                <p className="text-sm md:text-lg text-blue-800 font-bold">
                  Cash On Delivery
                </p>
              </span>
              <span className="text-base md:text-xl">
                Return Policy:{" "}
                <p className="text-sm md:text-lg">14 days easy return</p>
              </span>
            </div>
          </div>

          {/* Product reviews display */}
          <section id="reviews" className="p-2 pt-28">
            <span className="text-xl font-bold ">Product Review</span>
            <p>{product?.reviews?.length == 0 && "No Review Available"}</p>
            <div>
              {product?.reviews?.map((review, i) => (
                <div key={i} className="py-3 border-b-2 border-gray-500">
                  {/* icon,name,rating and date */}
                  <div className="flex items-center justify-between">
                    {/* icon and name  and rating*/}
                    <div className="flex items-center gap-2 text-lg">
                      <FaUser />
                      <p>{review?.userName}</p>
                      <Rating readOnly defaultValue={4} precision={0.5} />
                    </div>
                    {/* date */}
                    <div>
                      <p className="text-gray-600 text-sm">14th july, 2024</p>
                    </div>
                  </div>
                  {/* reviews */}
                  <div className="p-4">{`"${review?.comment}"`}</div>
                </div>
              ))}
            </div>
          </section>
          {/* Product reviews post */}
          <div className="mt-5 p-2">
            <span className="text-xl font-bold block ">
              Say something about this Product?
            </span>
            <textarea
              className="mt-2 p-2 block w-[100%] md:w-[50%] resize-none"
              rows={4}
              cols={40}
              placeholder="Type your review"
              name="review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  document.getElementById("save-button").click();
                }
              }}
            ></textarea>
            <button
              id="save-button"
              className="bg-black text-white rounded px-5 py-2 mt-2 mb-5"
              onClick={() => {
                updateProductWithReview();
                // notify()
              }}
            >
              Save
            </button>
            <Toaster position="top-right" reverseOrder={false} />
          </div>

          {/* Related Products */}
          <div className="p-2">
            <span className="text-xl font-bold ">Related Products</span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-3">
              {matchedProducts?.map((p, i) => (
                <ProductBox key={i} product={p} />
              ))}
            </div>
          </div>
        </Center>
      </Layout>
    </>
  );
};

export default SingleProductDetails;

export async function getServerSideProps() {
  await mongooseConnect();
  const productsDoc = await Product.find({}, null, {
    sort: { _id: -1 },
  });

  console.log(productsDoc, "new");

  return {
    props: {
      products: JSON.parse(JSON.stringify(productsDoc)),
    },
  };
}

// review carousel
//  {
//    product.reviews?.length > 0 ? (
//      <Carousel
//        swipeable={true}
//        draggable={true}
//        showDots={true}
//        responsive={responsive}
//        ssr={true} // means to render carousel on server-side.
//        infinite={true}
//        autoPlay={true}
//        // autoPlay={this.props.deviceType !== "mobile" ? true : false}
//        autoPlaySpeed={2000}
//        keyBoardControl={true}
//        customTransition="all .5"
//        transitionDuration={500}
//        containerClass="carousel-container"
//        removeArrowOnDeviceType={["tablet", "mobile"]}
//        // deviceType={this.props.deviceType}
//        dotListClass="custom-dot-list-style"
//        itemClass="carousel-item-padding-40-px"
//        className="mt-3"
//      >
//        {product.reviews.map((review, i) => (
//          <div
//            key={i}
//            style={{
//              backgroundColor: "#DBDCD9",
//              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
//            }}
//            className="text-black min-h-[300px] mx-2 p-3 mb-10"
//          >
//            <div className="flex justify-center items-center">
//              <img
//                className="w-[150px]"
//                src="https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-profile-glyph-black-icon-png-image_691589.jpg"
//              />
//            </div>
//            <div className="text-center font-bold italic mt-2">
//              <span>&quot;{review}&quot;</span>
//            </div>
//          </div>
//        ))}
//      </Carousel>
//    ) : (
//      <div>No reviews available</div>
//    );
//  }

// export async function getServerSideProps(context) {
//   await mongooseConnect();
//   const { id } = context.query;
//   const product = await Product.findById(id);
//   // console.log(product);

//   return {
//     props: {
//       product: JSON.parse(JSON.stringify(product)),
//     },
//   };
// }
