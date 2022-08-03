import {Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import { setCategories } from '../../store/categories/category.action';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetch } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesAsync } from '../../store/categories/category.action';

const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesAsync());
    },[dispatch]);


    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
    
}


export default Shop;