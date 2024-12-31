import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // AsyncStorage에서 장바구니 데이터 로드
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Failed to load cart from AsyncStorage:', error);
      }
    };

    loadCart();
  }, []);

  // 장바구니 상태가 변경될 때 AsyncStorage에 저장
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Failed to save cart to AsyncStorage:', error);
      }
    };

    saveCart();
  }, [cart]);

  // 유틸리티 함수: 장바구니에서 특정 ID의 상품 찾기
  const findItemInCart = (id) => cart.find((item) => item.id === id);

  // 장바구니에 상품 추가
  const addToCart = (item) => {
    if (!item || !item.id) {
      console.error('Invalid product data. Cannot add to cart.');
      return;
    }

    setCart((prevCart) => {
      const existingItem = findItemInCart(item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // 장바구니에서 상품 제거
  const removeFromCart = (id) => {
    if (!id) {
      console.error('Invalid product ID. Cannot remove from cart.');
      return;
    }

    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // 상품 수량 업데이트
  const updateQuantity = (id, quantity) => {
    if (!id || quantity <= 0) {
      console.error('Invalid ID or quantity. Cannot update cart.');
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  // 장바구니 비우기
  const clearCart = () => {
    setCart([]);
  };

  // 장바구니 총합 계산
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, '')); // '1,500원' -> 1500
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 커스텀 훅: 장바구니 사용
export const useCart = () => useContext(CartContext);
