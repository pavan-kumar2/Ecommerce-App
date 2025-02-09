import { createContext, useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router";
import { fetchProducts } from "../service/api";
import { ProductsInitialState, productReducer } from "../reducer/productReducer";
import { cartInitialState, cartReducer } from "../reducer/cartReducer";

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
    const [productsState, ProductsDispatch] = useReducer(productReducer, ProductsInitialState);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const location = useLocation();
    const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState);


    useEffect(() => {
        ProductsDispatch({ type: 'FETCH_START' })
        fetchProducts.then((response) => {
            ProductsDispatch({ type: 'FETCH_SUCCESS', payload: response.data })
        }).catch(error => ProductsDispatch({ type: 'FETCH_ERROR', payload: error.message }))
    }, []);

    useEffect(() => {
        setFilteredProducts((location.pathname === '/cart' ? cartState.cart : productsState.products).filter((product) =>
            product.title?.toLowerCase().includes(searchQuery?.toLowerCase())
        )
        );
    }, [searchQuery, productsState.products, cartState.cart, location.pathname]);



    return (<ProductContext.Provider value={{ productsState, cart: cartState?.cart, filteredProducts, searchQuery, cartDispatch, setSearchQuery }}>{children}</ProductContext.Provider>)
}