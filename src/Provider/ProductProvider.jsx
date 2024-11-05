import React from "react";
import { ProductContext } from "../Context/ProductContext"; 
import useProducts from "../hooks/useProducts";

export default function ProductProvider({ children }) {
  const {productsData,setProductsData, error, loading, fetchProductsData} = useProducts();
  
  return (
    <ProductContext.Provider value={{ productsData, setProductsData, error, loading, fetchProductsData }}> 
      {children}
    </ProductContext.Provider>
  );
}
