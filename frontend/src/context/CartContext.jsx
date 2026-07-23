import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.product === item.product && i.size === item.size && i.color === item.color
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, qty: i.qty + item.qty } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (product, size, color) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.product === product && i.size === size && i.color === color))
    );
  };

  const updateQty = (product, size, color, qty) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.product === product && i.size === size && i.color === color ? { ...i, qty } : i
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const itemsCount = cartItems.reduce((acc, i) => acc + i.qty, 0);
  const total = cartItems.reduce((acc, i) => acc + i.qty * i.price, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, itemsCount, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
