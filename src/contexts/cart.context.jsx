import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {

    const cartItem = cartItems.find(item => item.id == productToAdd.id);

    if(cartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id ? {
                ...cartItem, quantity: cartItem.quantity + 1
            } : cartItem
        );
    };
    return [...cartItems,{...productToAdd, quantity: 1}];
} 

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id == cartItemToRemove.id);

    // check if quantity is 1, remove that item from the cart

    if(existingCartItem.quantity == 1) {
        return cartItems.filter(cartItem => cartItem.id != existingCartItem.id);
    }

    return cartItems.map((cartItem) => 
    cartItem.id === cartItemToRemove.id ? {
        ...cartItem, quantity: cartItem.quantity - 1
    } : cartItem
    
);

}

const clearCartItem = (cartItems, cartItemToRemove) => {
    return cartItems.filter(cartItem => cartItem.id != cartItemToRemove.id);
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    cartTotal: 0,
    removeItemFromCart: () => {},
    clearItemFromCart: () => {}
})

// id
// name
// price
// imageUrl
// quantity

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);


    useEffect( () => {
        const newCartCount = cartItems.reduce((total,cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    },[cartItems]);

    // one of best practices of useEffect, single responsibility.

    useEffect( () => {
        const newCartTotal = cartItems.reduce((total,cartItem) => total + (cartItem.price * cartItem.quantity), 0);
        setCartTotal(newCartTotal);
    },[cartItems]);



    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemToCart = (product) => {
        setCartItems(removeCartItem(cartItems, product));
    }

    const clearItemFromCart = (product) => {
        setCartItems(clearCartItem(cartItems, product));
    }


    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemToCart, clearItemFromCart, cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}