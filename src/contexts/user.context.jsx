import { createContext, useState } from "react";


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
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
} 