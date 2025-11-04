import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { productsData } from "../../assets/data";

export interface ProductInterface {
    id: number,
    name: string,
    price: number,
    category: string,
    stock: number,
    description: string,
    createdAt: string,
    isActive: boolean,
    tags?: string[]
}

export interface ProductState {
    products: ProductInterface[];
    viewMode: 'list' | 'card';
    currentPage: number;
    itemsPerPage: number;
}

const initialState: ProductState = {
    products: productsData,
    viewMode: 'list',
    currentPage: 1,
    itemsPerPage: 9
};

const productSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<ProductInterface>) => {
            state.products.push(action.payload)
        },
        updateProduct: (state, action: PayloadAction<ProductInterface>) => {
            const index = state.products.findIndex((product) => product.id === action.payload.id);

            if (index !== -1) {
                state.products[index] = { ...state.products[index], ...action.payload }
            }
        },
        setViewMode: (state, action) => {
            state.viewMode = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }

    }
})

export const { addProduct, updateProduct, setViewMode, setCurrentPage } = productSlice.actions;
export default productSlice.reducer;