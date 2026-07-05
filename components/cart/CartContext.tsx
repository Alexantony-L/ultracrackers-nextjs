"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

/**
 * CartContext
 * Holds cart items + open/closed state for the drawer, shared between
 * CartButton (the floating icon) and CartDrawer (the panel it opens).
 *
 * PERSISTENCE:
 * Cart items are mirrored to localStorage under `STORAGE_KEY`, so a page
 * refresh (or closing/reopening the tab) doesn't lose the cart. It only
 * clears when `clearCart()` runs — i.e. after a successful order, or if
 * you wire up a manual "empty cart" action.
 *
 * IMPORTANT: Wrap only the product page's tree in <CartProvider>, NOT the
 * root layout — that's what keeps the cart button scoped to the product
 * page instead of showing on every route. See usage note at the bottom
 * of CartButton.tsx / CartDrawer.tsx.
 */

const STORAGE_KEY = "cwc_cart_items";

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  mrp: number;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load any previously saved cart once, on first mount (client-side only).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Corrupt or inaccessible storage — start with an empty cart.
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist on every change, but only after the initial load above has
  // run — otherwise this would overwrite saved data with the empty
  // starting state before it has a chance to load.
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage full or unavailable (e.g. private browsing) — fail silently.
    }
  }, [items, isHydrated]);

  const addItem: CartContextValue["addItem"] = (item, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage unavailable — the state is still cleared either way.
    }
  };

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a <CartProvider>");
  }
  return ctx;
}