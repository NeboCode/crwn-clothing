import { useSelector } from "react-redux/es/exports";
import {selectCartItems, selectCartTotal} from "../../store/cart/cart.selector";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component";
import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from './checkout.styles.jsx';

const Checkout = () => {

    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    return(
        <CheckoutContainer>
            <CheckoutHeader>

            <HeaderBlock>
                <span>Product</span>
            </HeaderBlock>
            <HeaderBlock>
                <span>Description</span>

            </HeaderBlock>
            <HeaderBlock>
                <span>Quantity</span>
            </HeaderBlock>
            <HeaderBlock>
                <span>Price</span>
            </HeaderBlock>
            <HeaderBlock>
                <span>Remove</span>
            </HeaderBlock>

        </CheckoutHeader>

        {cartItems && cartItems.map((product) => {
            return <CheckoutItem key={product.id} product={product} />
        })}

        <hr />
        <Total>Total: {cartTotal}</Total>
        <PaymentForm />
        </CheckoutContainer>
    );
}

export default Checkout;