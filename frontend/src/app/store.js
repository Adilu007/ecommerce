import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../features/auth/authSlice'
import categorySlice from "../features/category/categorySlice";
import subCategorySlice from '../features/subCategory/subCategorySlice'
import productSlice from '../features/products/productSlice'
import cartSlice from '../features/cart/cartSlice'


const store = configureStore({
    reducer: {
        auth: authSlice,
        category: categorySlice,
        subCategory: subCategorySlice,
        product: productSlice,
        cart: cartSlice
    }
})

export default store