const { createContext, useState, useEffect } = require("react");

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  const [cartProducts, setCartProducts] = useState([]);
  const [favouriteProducts, setFavouriteProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      // console.log('inner useeffect',cartProducts.length)
      if (cartProducts?.length >= 0) {
        ls?.setItem("cart", JSON.stringify(cartProducts));
      }
      if (favouriteProducts?.length >= 0) {
        ls?.setItem("favourite", JSON.stringify(favouriteProducts));
      }
    }, 300);
  }, [cartProducts, favouriteProducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
    if (ls && ls.getItem("favourite")) {
      setFavouriteProducts(JSON.parse(ls.getItem("favourite")));
    }
  }, []);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function addFavourite(productId) {
    // console.log(favouriteProducts);
    // console.log('f cick')
    const isAvailable = favouriteProducts.find((item) => item == productId);
    // console.log("is available", isAvailable);
    if (isAvailable == "" || isAvailable == undefined) {
      // console.log("inner if");

      setFavouriteProducts((prev) => [...prev, productId]);
    }
  }

  // console.log(cartProducts);
  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);

      if (pos != -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  }

  function removeFavourite(productId) {
    // console.log("clicked");
    setFavouriteProducts((prev) => {
      const pos = prev.indexOf(productId);

      if (pos != -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  }

  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        favouriteProducts,
        addProduct,
        addFavourite,
        removeFavourite,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
