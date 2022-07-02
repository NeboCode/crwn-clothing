import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";


const SignIn = () => {

    return (
        <div> 
        {/* <h1>Sign in page</h1>
        <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
        <SignInForm />
        <SignUpForm />
        </div>
    );
}

export default SignIn;