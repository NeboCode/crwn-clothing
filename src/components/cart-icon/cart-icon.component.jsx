import './cart-icon.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import {ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';



const CartIcon = () => {

    const { isCartOpen,setIsCartOpen } = useContext(CartContext);
    const { cartCount } = useContext(CartContext);

    const toggleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    }


    return (
        <div className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon' onClick={toggleIsCartOpen}/>
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon;