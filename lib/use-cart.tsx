"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { CartItem } from "./types";
import { products } from "./products";

// Função para verificar o estoque disponível de um produto
function getAvailableStock(productId: string, size: string | null, color: string | null): number {
  const product = products.find(p => p.id === productId);
  if (!product) return 0;

  const variant = product.variants.find(v => v.color === color);
  if (!variant) return 0;

  const sizeInfo = variant.sizes.find(s => s.size === size);
  return sizeInfo?.stock || 0;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => boolean; // Retorna true se adicionou com sucesso
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, quantity: number) => boolean; // Retorna true se atualizou com sucesso
  clearCart: () => void;
  getAvailableStock: (productId: string, size: string | null, color: string | null) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
    setMounted(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, mounted]);

  const addToCart = (item: CartItem): boolean => {
    let success = false;
    
    setCart((prevCart) => {
      // Verificar estoque disponível
      const availableStock = getAvailableStock(item.id, item.size, item.color);
      
      // Check if item already exists in cart (with same id, size, and color)
      const existingItemIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color
      );

      if (existingItemIndex !== -1) {
        // If item exists, check if we can add more
        const currentQuantity = prevCart[existingItemIndex].quantity;
        const newQuantity = currentQuantity + item.quantity;
        
        if (newQuantity <= availableStock) {
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex].quantity = newQuantity;
          success = true;
          return updatedCart;
        } else {
          // Don't add more than available stock
          console.warn(`Estoque insuficiente. Disponível: ${availableStock}, tentando adicionar: ${newQuantity}`);
          return prevCart;
        }
      } else {
        // If item doesn't exist, check if we have enough stock
        if (item.quantity <= availableStock) {
          success = true;
          return [...prevCart, item];
        } else {
          console.warn(`Estoque insuficiente. Disponível: ${availableStock}, tentando adicionar: ${item.quantity}`);
          return prevCart;
        }
      }
    });
    
    return success;
  };

  const removeFromCart = (item: CartItem) => {
    setCart((prevCart) =>
      prevCart.filter(
        (cartItem) =>
          !(
            cartItem.id === item.id &&
            cartItem.size === item.size &&
            cartItem.color === item.color
          )
      )
    );
  };

  const updateQuantity = (item: CartItem, quantity: number): boolean => {
    if (quantity <= 0) return false;
    
    // Verificar estoque disponível
    const availableStock = getAvailableStock(item.id, item.size, item.color);
    
    // Se a quantidade solicitada é maior que o estoque, não atualizar
    if (quantity > availableStock) {
      return false;
    }
    
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id &&
        cartItem.size === item.size &&
        cartItem.color === item.color
          ? { ...cartItem, quantity }
          : cartItem
      )
    );
    
    return true;
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getAvailableStock }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
