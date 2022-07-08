import {CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles.jsx';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';



const CartIcon = () => {

    const { isCartOpen,setIsCartOpen } = useContext(CartContext);
    const { cartCount } = useContext(CartContext);

    const toggleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    }


    return (
        <CartIconContainer>
            <ShoppingIcon onClick={toggleIsCartOpen}/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;