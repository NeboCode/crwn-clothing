import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import {CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton} from './checkout-item.styles.jsx';

const CheckoutItem = ({product}) => {

    const {addItemToCart, removeItemToCart, clearItemFromCart} = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(product);
    const addItemHandler = () => addItemToCart(product);
    const removeItemHandler = () => removeItemToCart(product);


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