import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";


export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);



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


export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}

export const removeItemToCart = (cartItems, product) => {
    const newCartItems = removeCartItem(cartItems, product);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}

export const clearItemFromCart = (cartItems, product) => {
    const newCartItems = clearCartItem(cartItems, product);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}