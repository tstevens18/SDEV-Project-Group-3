import { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../api/cartAPI';
import { scheduleService } from '../api/scheduleAPI';
import { useAuth } from './useAuth';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, isStudent } = useAuth();

  useEffect(() => {
    if (isAuthenticated() && isStudent()) {
      loadCart();
      loadEnrolledCourses();
    } else {
      setCart([]);
      setEnrolledCourseIds([]);
    }
  }, [isAuthenticated, isStudent]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await cartService.getCart();
      setCart(data);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadEnrolledCourses = async () => {
    try {
      const ids = await scheduleService.getEnrolledCourseIds();
      setEnrolledCourseIds(ids);
    } catch (error) {
      console.error('Error loading enrolled courses:', error);
    }
  };

  const addToCart = async (courseId) => {
    try {
      const response = await cartService.addToCart(courseId);
      setCart(response.cart);
      return { success: true, message: 'Course added to cart' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const removeFromCart = async (courseId) => {
    try {
      const response = await cartService.removeFromCart(courseId);
      setCart(response.cart);
      return { success: true, message: 'Course removed from cart' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setCart([]);
      return { success: true, message: 'Cart cleared' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const isInCart = (courseId) => {
    return cart.some(course => course._id === courseId);
  };

  const isEnrolled = (courseId) => {
    return enrolledCourseIds.includes(courseId);
  };

  const cartCount = cart.length;

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    isEnrolled,
    cartCount,
    loadCart,
    loadEnrolledCourses
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};