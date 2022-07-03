import { useState, useContext } from "react";
import { auth, signInWithGooglePopup, signInEmailPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.styles.scss';


import { UserContext } from "../../contexts/user.context";



const defaultFormFields = {
    email: '',
    password: '',
};


const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    
    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
    }

    const logUser = async (event) => {
        event.preventDefault();
        try {
            const {user} = await signInEmailPassword(email,password);
            setCurrentUser(user);
            console.log(user);
            resetFormFields();
        } catch(error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('You have entered a wrong password!');
                    break;
                case 'auth/user-not-found':
                    alert('User account with this email address does not exist.');
                    break;
            
                default:
                    alert('An error occured.');
                    break;
            }
    
        }
      
    }

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }
    

    return (
        <div className='sign-in-form-container'>
        <h2>Already have an account?</h2>
        <span>Sign in with your email & password</span>
        <form onSubmit={logUser}>
        <FormInput label='Email' type='email' name='email' onChange={handleChange} value={email} required />
        <FormInput label='Password' type='password' name='password' onChange={handleChange} value={password} required />
        <div className="buttons-container">
            <Button type='submit'>Sign in</Button>
            <Button type='button' buttonType='google' onClick={logGoogleUser}>Sign in with Google</Button>
        </div>

        </form>
        </div>
    );
}

export default SignInForm;