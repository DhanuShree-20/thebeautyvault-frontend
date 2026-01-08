import { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

 const toggleWishlist = (product) => {
  setWishlistItems((prev) => {
    const isExist = prev.find((item) => item._id === product._id);
    if (isExist) {
      // Remove if it already exists
      return prev.filter((item) => item._id !== product._id);
    } else {
      // Add if it doesn't exist
      return [...prev, product];
    }
  });
};

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);