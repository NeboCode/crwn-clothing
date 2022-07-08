import {createContext, useState, useEffect} from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';


export const CategoriesContext = createContext({
    categoriesMap: {},
})


export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = {categoriesMap, setCategoriesMap};

    useEffect(() => {
        const getCategoriesMap = async () =>  {
            const categoryMap = await getCategoriesAndDocuments('categories');
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    },[]);

    // useEffect(() => {
    //     addCollectionAndDocuments('categories',SHOP_DATA);
    // },[]);

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
}