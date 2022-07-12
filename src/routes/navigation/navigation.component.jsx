import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink
} from './navigation.styles';

import { Fragment, useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { Outlet } from 'react-router-dom';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import { selectCurrentUser } from '../../store/user/user.selector';
import { useSelector } from 'react-redux';


const Navigation = () => { 

  const currentUser = useSelector(selectCurrentUser);
  const { isCartOpen } = useContext(CartContext);

 
    return(
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className='logo' />
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop'>Shop</NavLink>
                {currentUser ? (
                  <NavLink as="span" onClick={signOutUser}>Sign Out</NavLink>)
                  : (                <NavLink to='/auth'>Sign In</NavLink>
                  )
                 }
                <CartIcon />
            </NavLinks>
                {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
   }
  
export default Navigation;