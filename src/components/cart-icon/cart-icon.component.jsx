import {CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles.jsx';
import { useSelector, useDispatch } from 'react-redux';

import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector.js';
import { setIsCartOpen } from '../../store/cart/cart.action.js';

const CartIcon = () => {

    const isCartOpen = useSelector(selectIsCartOpen);
    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));


    return (
        <CartIconContainer>
            <ShoppingIcon onClick={toggleIsCartOpen}/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;