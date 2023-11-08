import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import { useRouter } from "next/router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Layout from "@/components/Layout";

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
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  background-color: #f3eff9;
  width: 8rem;
`;
const Price = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 2px;
`;
// const notify = () => toast.success('Review Added');
const SingleProductDetails = () => {
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState({});
  const router = useRouter();

  const { id } = router.query;

  const fetchProduct = () => {
    if (id) {
      axios.get("/api/products?id=" + id).then((res) => setProduct(res.data));
    } else {
      return;
    }
  };

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
    console.log("data", data);
    if (review == "") return;
    await axios
      .post("/api/products/", {
        _id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        properties: product.properties,
        url: product.url,
        review,
      })
      .then(async (res) => {
        if (res.status == 200) {
          setReview("");
          fetchProduct();
          toast.success("Review Added", {
            duration: 5000,
          });
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
              <img src={product?.url} />
              <div className="flex items-center gap-2 m-4">
                <div
                  onClick={() => removeProduct(product._id)}
                  id="decrease-button">
                  -
                </div>
                <span>
                  {cartProducts.filter((id) => id === product._id).length}
                </span>
                <div
                  onClick={() => addProduct(product._id)}
                  id="increase-button">
                  +
                </div>
              </div>
            </WhiteBox>
            <div>
              <Title>{product.title}</Title>
              <PriceRow>
                <div>
                  <span>Price: </span>
                  <Price>${product.price}</Price>
                </div>
              </PriceRow>
              <div className="mt-5">
                <h2 className="underline font-semibold">Description</h2>
                <p>{product.description}</p>
              </div>

              <div onClick={() => router.push("/cart")}>
                <button
                  onClick={() => {
                    router.push("/cart");
                    addProduct(product._id);
                  }}
                  className="bg-black text-white mt-10 px-3 py-1 rounded-md ">
                  Buy Now
                </button>
              </div>
            </div>
          </ColWrapper>
          <div>
            <span className="text-xl font-bold ">Product Review</span>

            {product.reviews?.length > 0 ? (
              <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
                // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                autoPlaySpeed={2000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                // deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                className="mt-3">
                {product.reviews.map((review) => (
                  <div
                    style={{
                      backgroundColor: "#DBDCD9",
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    }}
                    className="text-black min-h-[300px] mx-2 p-3 mb-10">
                    <div className="flex justify-center items-center">
                      <img
                        className="w-[150px]"
                        src="https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-profile-glyph-black-icon-png-image_691589.jpg"
                      />
                    </div>
                    <div className="text-center font-bold italic mt-2">
                      <span>&quot;{review}&quot;</span>
                    </div>
                  </div>
                ))}
              </Carousel>
            ) : (
              <div>No reviews available</div>
            )}
          </div>

          <div className="mt-5">
            <span className="text-xl font-bold block ">
              Say something about this Product?
            </span>
            <textarea
              className="mt-2 p-2 block w-[50%] resize-none"
              rows={4}
              cols={40}
              placeholder="Type your review"
              name="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}></textarea>
            <button
              className="bg-black text-white rounded px-5 py-2 mt-2 mb-5"
              onClick={() => {
                updateProductWithReview();
                // notify()
              }}>
              Save
            </button>
            <Toaster position="top-right" reverseOrder={false} />
          </div>
        </Center>
      </Layout>
    </>
  );
};

export default SingleProductDetails;

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
