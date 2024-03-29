import { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

import {SignInFormContainer, ButtonsContainer} from './sign-in-form.styles';


import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

const defaultFormFields = {
    email: '',
    password: '',
};


const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const dispatch = useDispatch();
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const logGoogleUser =  () => {
        dispatch(googleSignInStart());
    }

    const logUser = async (event) => {
        event.preventDefault();
        try {
            dispatch(emailSignInStart(email,password));
            resetFormFields();
        } catch(error) {

        }
        
      
    }

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }
    

    return (
        <SignInFormContainer>
        <h2>Already have an account?</h2>
        <span>Sign in with your email & password</span>
        <form onSubmit={logUser}>
        <FormInput label='Email' type='email' name='email' onChange={handleChange} value={email} required />
        <FormInput label='Password' type='password' name='password' onChange={handleChange} value={password} required />
        <ButtonsContainer>
            <Button type='submit'>Sign in</Button>
            <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={logGoogleUser}>Sign in with Google</Button>
        </ButtonsContainer>

        </form>
        </SignInFormContainer>
    );
}

export default SignInForm;