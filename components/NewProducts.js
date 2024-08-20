import Center from "./Center";
import ProductBox from "./ProductBox";

const NewProducts = ({ newProducts }) => {
  return (
    <div style={{ backgroundColor: "#F2F4F8" }}>
      <Center>
        <div className=" text-center mb-6">
          <h1 className="font-extrabold text-2xl">Featured Products</h1>
          <h4>Check & Get Your Desired Product!</h4>
        </div>
        <div id="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center text  gap-3 p-2">
            {newProducts?.length > 0 &&
              newProducts.map((product) => (
                <ProductBox key={product._id} product={product} />
              ))}
          </div>
        </div>
      </Center>
    </div>
  );
};

export default NewProducts;
