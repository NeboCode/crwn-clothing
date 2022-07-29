import { createSelector } from "reselect";


// function to take data from state, raw categories
const selectCategoryReducer = (state) =>  {
  return state.categories;
}


// ???????????????, raw categories returned again and memoized.
export const selectCategories = createSelector(
   [selectCategoryReducer],
   (categoriesSlice) => {
    return categoriesSlice.categories;
  }
);



// getting our formatted categories from our previously memoized selectCategories.
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
  return categories.reduce((acc, category) => {
  const {title, items} = category;
  acc[title.toLowerCase()] = items;
  return acc;
},{})
}
);