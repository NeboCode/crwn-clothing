import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector.js';
import { addItemToCart, removeItemToCart, clearItemFromCart } from '../../store/cart/cart.action.js';

import {CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton} from './checkout-item.styles.jsx';

const CheckoutItem = ({product}) => {

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, product));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, product));
    const removeItemHandler = () => dispatch(removeItemToCart(cartItems, product));


    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={product.imageUrl} alt={product.name} />
            </ImageContainer>
            <BaseSpan>{product.name}</BaseSpan>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>{product.quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <BaseSpan>{product.price}</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
      
        </CheckoutItemContainer>
    );


}

export default CheckoutItem;