import { useState, useEffect } from 'react';
import { cartApi } from '../utils/api';

export interface CartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart from API
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartApi.getCart();
      if (response.success && response.data) {
        // Transform API response to CartItem format
        const items = response.data.items || [];
        setCart(items.map((item: any) => {
          // Handle both populated and non-populated product references
          const productId = typeof item.product === 'object' && item.product?._id 
            ? item.product._id 
            : item.product;
          
          return {
            product: productId,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
          };
        }));
      } else {
        setCart([]);
      }
    } catch (error: any) {
      console.error('Error fetching cart:', error);
      // If user is not authenticated, set empty cart (don't show error)
      if (error.response?.status === 401) {
        setCart([]);
      } else {
        setCart([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    try {
      await cartApi.addToCart({
        product: item.product,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity,
      });
      // Refresh cart after adding
      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      await cartApi.removeFromCart(productId);
      // Refresh cart after removing
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }
      await cartApi.updateQuantity(productId, quantity);
      // Refresh cart after updating
      await fetchCart();
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await cartApi.clearCart();
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    totalPrice,
    loading,
    refreshCart: fetchCart,
  };
};
