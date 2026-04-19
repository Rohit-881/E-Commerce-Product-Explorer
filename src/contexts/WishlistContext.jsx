import { createContext, useState } from "react";


export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

 const addToWishlist = (product) => {
  setWishlistItems((prev) => {
    const exists = prev.find((item) => item.id === product.id);

    if (exists) return prev;

    return [...prev, product];
  });
};
  const removeFromWishlist = (id) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;