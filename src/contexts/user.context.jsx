import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener,createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// we export a value, then we useState hook in order to create a getter / setter.
// we pass this value to the provider.
export const UserProvider = ({children}) => {
    const [ currentUser, setCurrentUser ] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            console.log(user);
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })
        return unsubscribe;

    },[]);
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
} 