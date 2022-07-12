# React course notes

## General React concepts

- `Document API` imperative paradigm, directly changing individual parts of your web app -(if x do y) - difficult to see relationships between events and edge cases - React fixes that. Declarative paradigm, state, holding blueprint of what a page should look like. React “don’t touch the DOM, I will”. Building website using Lego blocks. Unidirectional data flow - data flows only one way so it’s easier to debug the code.
- Key questions when developing in React: Decide on Components ? Decide on State and where it lives? What changes when state changes?
- `super()` inside `constructor()` and state declaration (`this.state`)
- `onClick` needs an anonymous function `() ⇒ this.setState({name: ‘Test’)});`
- `setState()` method is asynchronous but we can use a function and another argument which is a callback function that returns the updated state. `this.setState(() ⇒ {}, () ⇒ {});`
- `componentDidMount()` runs after render, changing the state here will trigger a re-render. API logic belongs here.
- Storing original state data - we do not modify state instead we store a searchQuery in state as well. Then we change the searchQuery inside `render()`, outside of `render()` methods return statement we have a filter list and the destructuring.
- Folder storage layout ? Inside `src` folder, create a folder named `components`, inside of which we create a folder for each component. The component files themselves are named `componentName.component.jsx`.
- Map in JSX uses normal brackets `()`.
- React renders on `componentDidMount` and whenever state or props get changed.
- CSS specific styling for a component is done in a file inside component folder named `component.styles.css`.
- When you import a CSS stylesheet, that style is going to be applicable to entire website, in order to do specific component styling we use CSS-in-JS libraries.
- `componentDidMount` - Mounting part, `componentDidUpdate` - after new props, setState or forceUpdate, `componentWillUnmount` - to get rid of handlers hogging memory for components that are no longer being shown.
- Functional components don’t need a `render()`, `constructor()`, functions are pure (classic JS functions) and they don’t need the `Component` import from React.
- Functional components don’t have lifecycle methods, we need to think about them in terms of functions and side effects.
- Pure functions are functions that should always return same result given same arguments, there’s no mutation.
- Side effects in impure functions are when we affect things outside of the function scope. Hooks generate side effects and create impure functions.
- Hook: `useState` imported from react. It uses array destructuring (`[]`). First argument is the initial value of the state variable, second argument is a setter function name, for example: `const [searchField, setSearchField] = useState('');` When the state value changes, entire component gets re-run.
- Hook: `useEffect` imported from react. First argument is a callback, second argument is array of dependencies. Whenever the dependencies change, callback gets run. In our project, we needed to use this hook once and never trigger it again, so I passed an empty array as second argument.
- Props in functional components are passed as argument. `const {monsters} = props;` We can do the de-structuring directly in the component argument like so: `const CardList = ({monsters})`
- Implicit return statement in a functional component: `functionalComponent = () ⇒ (<div></div>)`
- React-router: We install the package using npm/yarn. Then we can `import { BrowserRouter } from 'react-router-dom'`. We then wrap our App component in a `<BrowserRouter />` component.
- React routes are defined within our main component (`App.js`) and the components are `<Routes />` and `<Route />`. We modify the return statement of our main component, wrap everything with the `Routes` component, then write individual `Route` components which have a `path` and `element` attributes, where `element` refers to a component.
- We can use a closing tag for the component in order to achieve routing nesting, where a parent route with `/home` path and a child component with `shop` path.
- We use an imported `<Outlet />` component in our component in order to signify where the other components can be mounted.
- We can use the attribute `index` in a `Route` component in order to match the path of parent, this way we get a home page component showing on the `/` route.
- `Fragment` component imported from `react`, used in place of an outer wrapping `div`, does not get rendered to the page.
- `Prop drilling` refers to a concept where we pass props thru multiple layers of intermediary in order to pass the props where we need them. This approach is problematic since we pass props thru components that don’t need them.
- `Observer pattern`: Click stream - asynchronous sequence of events in real time, variable amount of time between events, observable. Listener is a class or object that has 3 methods: `next()`- new event happens, `error()` - do something when error happens and `complete()` do something when the entire stream finished. We need to `subscribe` to stream, we can do that at any point when the stream is going, but this won’t give us access to the past events.
- We have a hook from ReactRouterDOM `useNavigate` which we can use to redirect to a route.
- We should not write everything in one `useEffect`, instead we need to think about single responsibility, meaning that we should seperate concerns.
- Any async things we need to do inside of a `useEffect`, we need to declare a new async function within the `useEffect` and not make the hook definition itself async. We then under it call the async function.
- Nested routes, In react router, we can use `<Route path='shop/*' element={ <Shop /> } />` to signify a wildcard route, which will trigger on any route matching the pattern before the wildcard (`/*`). Then, as an example, inside the `Shop` component, I also had to import `Routes` and `Route` and write some routes here too.
- React-router-dom hook `useParams` allows us to read URL params that we received by naming a constant in our route definition, like so: `<Route path=":category" element={<Category />} />`.
- Important to remember: If we have components that rely on asynchronous data, it’s important to only render the component if the actual data is present. (I had to add a check `products &&` to rendering part of the function).
- **Computed Property Names** in JavaScript, when in object we have a key surrounded by square brackets [x] refers to the value of x being taken as a key.

## Firebase

- Firebase is imported by installing a npm library.
- We then create a `utils` folder where we have another folder for `firebase` and finally a `firebase.utils.js` file.
- Inside that utils file, we import the functions from the SDK, we copy over the `firebaseConfig` object we get from Firebase website.
- Then we define our app with `initializeApp` function, create a provider (`new GoogleAuthProvider();`
- Then we export the `auth` and the `signInWithGooglePopup˙` which is a function call which takes our `auth` and `provider` constants.
- On Firebase Cloud Firestore, we create a database.
- `Rules` refer to a policy of access where we can define who can access our data.
- In order to use Firestore, we import `getFirestore`, `doc`, `getDoc` and `setDoc`.
- We first call the function to get a user reference `doc()`, which takes in arguments: `db` - which we get from `getFirestore()`, a collection name as a string and an unique identifier (like `user.id`).
- We then call `getDoc()` with the reference, if it exists we simply return the result of this call, if it doesn’t exist we call `setDoc()` with data we want to set for this user.
- Firebase object `auth` that we obtained by calling `getAuth()` persists the authentication of the app.
- Observer pattern, Firebase gives us a function `onAuthStateChanged` which takes in two parameters: `auth` and a `callback` function. We can leverage this in order to centralize our authentication and in the project, this was done in the UserContext where we simply used an `useEffect` hook in order to call `onAuthStateChanged` with a callback where we updated the context state. We named the observer `unsubscribe` and returned it inside a hook in order to stop using it once the hook is finished. `onAuthStateChanged` returns a `Unsubscribe` function.
- `collection()` method from firestore, allows us to get a collection reference. Takes in `db` as argument and a collection `key`.
- Transaction is a word that represents a successful unit of work in database (successful only being if both things executed perfectly = example: decreasing money from another bank account AND incrementing another bank account).
- `writeBatch()` from firestore, takes in `db` as an argument. Batch allows us to append a bunch of writes, deletes, updates and only when we are ready we fire the Batch and it gets executed.
- We loop over our objects, for each object we get a document reference from Firebase and then call `batch.set()` on the reference, passing the collection reference and a unique key (name). We then `await batch.commit()`.
- We can then in our Products context, add a useEffect hook which will trigger once and populate our firestore database.
- What’s important to remember is to write our own functions instead of using the provided functions from libraries. That way, even if something  changes in the library, we just need to update our function definition in one central place instead of refactoring code elsewhere in order to fix the breaking changes.

## React Context

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/acd96546-4b38-41b4-b888-458ba2f34854/Untitled.png)

- Allows us to pass information to global context (similar to sessions in PHP). This data can be accessed anywhere.
- Create a folder in `src`, named `contexts` then a file `file_name.context.jsx`.
- We need to import `createContext` like so: `import { createContext } from "react";`
- First, we export a context like `export const UserContext = createContext({` and then we specify default values for the context.
- Second we create a UserProvider component which takes in children and returns, We use a `useState`hook in order to specify our state we want in context, and we usually set it to NULL.

```jsx
export const UserProvider = ({children}) => {
    const [ currentUser, setCurrentUser ] = useState(null);
    const value = {currentUser, setCurrentUser};
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
```

- We then go to `index.js` and wrap our App component with `UserProvider` component.
- In order to use context within a component we need the following:

```jsx
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
// We import just what we need, 
// depending what we want to do with the data (getter/setter).
const { setCurrentUser } = useContext(UserContext);
```

- The `useContext` triggers a re-render whenever the state changes due to `useState` function within the Provider.
- With Context we are able to wrap child components where we want to use our context.

## Styled Components

- Just one flavor of CSS-in-JS.
- `npm i styled-components`
- We convert our `.styles.scss` files to have a `.jsx` extension.
- `import styled from 'styled-components';`
- Then we export a style using the following syntax (yes, back ticks):

```jsx
export const NavigationContainer = styled.div`
height: 70px;
width: 100%;
display: flex;
justify-content: space-between;
margin-bottom: 25px;
`
```

- We just include this as a component in our file.
- We can also extend any other component using `styled(COMPONENT_NAME)` instead of `styled.div`
- Additionally, we can use an `as` attribute to render the component as a different HTML element.

```jsx
<NavLink as="span">Sign Out</NavLink>)
```

- We can also import other components and target them within our style like this:

```jsx
import {BaseButton, GoogleSignInButton, InvertedButton } from '../button/button.styles';

export const CartDropdownContainer = styled.div`
width: 240px;
height: 340px;

${BaseButton},
${GoogleSignInButton},
${InvertedButton} {
  margin-top:auto;
}
`;
```

- Important to note: We must make sure not to reference components defined below this declaration in the code (for example: ErrorMessage component defined below CartDropdownContainer).
- We can import {`css`} from `styled-components` and then use it with `styled.css` in order to create blocks of CSS that we can interpolate wherever we want.
- Also, we can use props in our components to include these styles, like so `${({shrink}) => shrink && shrinkLabelStyles};`

## Redux + Reducers

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6cc873ca-ce38-474c-8272-b7e0e4299ecc/Untitled.png)

- Context is a state management strategy, Redux is another.
- Reducers - example cartReducer object, stores same items.
- Instead of leveraging `useEffect` and `useState`, we use `Action`.
- Action is just an object with two values: `type` - string and a `payload` - anything.
- `Action { type:"TOGGLE_CART_IS_OPEN", payload: undefined }` - `isCartOpen` reacts to this action.
- `Action { type:"ADD_ITEM_TO_CART", payload: {...} }` - `cartItems, cartCount, cartTotal` react to this action.
- Reducers in code are pretty simple, they’re just functions that return an Object. They take the current state and an action as arguments.  Reducers only store readable values.
- Reducers as a concept are more valuable when we have more complex state of application, for simpler things we should just use `useState`hook.
- So how do we use reducers in React? We have a `useReducer` hook that we can import.
- Example reducer syntax:

```jsx
const userReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case 'SET_CURRENT_USER':
            return {
                                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`)
    }
}
```

     With the above syntax, how do we use this reducer?

We simply pass it to our Provider, using the hook we imported earlier.

`const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);`

We pass the reducer we want to use and the initial state constant.

Then we pass the variable obtained from state to our `value` which we return through the Provider component.

### Starting with Redux

- Context API vs Redux - Redux will always wrap the entire application, Context can wrap only parts. You don’t want to use both at the same time, reason being Context can be replaced by Redux.
- We start using Redux by installing two libraries `npm i redux react-redux redux-logger`
- **All of our reducers react to every single action.**
- We need to return state in every reducer, because actions get passed to every reducer, even the ones that don’t have to execute.
- Example setup of a Redux store:

```jsx
import {compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

// root-reducer
const middlewares  = [logger];
const composedEnhancers = compose(applyMiddleware(...middlewares));
```

Root reducer setup:

```jsx
import { combineReducers } from "redux";
import {userReducer} from './user/user.reducer';

export const rootReducer = combineReducers({
    user: userReducer

});
```

Then we make changes to our `index.js` file, 

```jsx
import { Provider } from 'react-redux';
import { store } from './store/store';
```

- We wrap our entire application within the provider and pass the store as a `store` prop.