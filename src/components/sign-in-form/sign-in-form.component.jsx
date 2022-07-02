import { useState } from "react";
import { auth, signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const SignInForm = () => {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    

    return (
        <div className='sign-in-form-container'>
        <h2>I already have an account</h2>
        <span>Sign in with your email & password</span>
        <form>
        <FormInput type='email' name='email' onChange={changeHandler} />
        <FormInput type='password' name='password' onChange={changeHandler} />
        </form>
        <Button buttonType='google'>Log in with Google</Button>
        </div>
    );
}

export default SignInForm;