import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    cartItems: [],
    cartTotal: 0,
    cartCount: 0,
    isCartOpen: false
};

const cartReducer = (state, action) => {

    const {type, payload} = action;


    switch (type) {

        case CART_ACTION_TYPES.SET_CART_ITEMS:
        return {
            ...state,
            ...payload
        }      

        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
        return {
            ...state,
            isCartOpen: payload
        }      
    
        default:
            throw new Error(`Unhandled type error with type ${type}`)
    }

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
    // const [isCartOpen, setIsCartOpen] = useState(false);


    const [state, dispatch] = useReducer(cartReducer,INITIAL_STATE);

    const {isCartOpen, cartItems, cartCount, cartTotal} = state;


    const updateCartItemsReducer = (cartItems) => {

        const newCartCount = cartItems.reduce((total,cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = cartItems.reduce((total,cartItem) => total + (cartItem.price * cartItem.quantity), 0);

        const payload = {
            cartItems: cartItems,
            cartCount: newCartCount,
            cartTotal: newCartTotal
        };

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS,payload));
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
        dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool});
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemToCart = (product) => {
        const newCartItems = removeCartItem(cartItems, product);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (product) => {
        const newCartItems = clearCartItem(cartItems, product);
        updateCartItemsReducer(newCartItems);
    }


    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemToCart, clearItemFromCart, cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}