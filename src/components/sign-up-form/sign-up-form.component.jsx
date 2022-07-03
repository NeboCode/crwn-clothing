import { useState, useContext } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {


    const {setCurrentUser} = useContext(UserContext);

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    // function which creates an user
    const handleSubmit =  async (event) => {
        event.preventDefault();
        // confirm password match, check if we authenticated user, create user document
        if(password !== confirmPassword) return;
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email,password);
            setCurrentUser(user);
            console.log(user);
            if(user) {
                await createUserDocumentFromAuth(user, { displayName });
                resetFormFields();
            }
        } catch (error) {
            if(error.code == 'auth/email-already-in-use') {
                alert('Email is already in use');
            } else {
                alert('User creation encountered an error', error);

            }
            console.log(error);
        }
    

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className='sign-up-container'>
        <h2>Don't have an account?</h2>
        <span>Sign up with your email & password.</span>
        <form onSubmit={handleSubmit}>
        <FormInput label='Display Name' type='text' required onChange={handleChange} name='displayName' value={displayName} />
        <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email} />
        <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password} />
        <FormInput label='Confirm Password' type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword} />

        <Button type='submit'>Sign Up</Button>

        </form>
        
        </div>
    );

}

export default SignUpForm;