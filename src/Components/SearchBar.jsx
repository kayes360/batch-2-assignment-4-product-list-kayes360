import React, { useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "../Context/ProductContext";

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
  const { productsData,setProductsData, fetchProductsData } = useContext(ProductContext); 
  const [originalProducts, setOriginalProducts] = useState([]);

  // Set original products on initial load
  useEffect(() => {
    if (productsData.length > 0 && originalProducts.length === 0) {
      setOriginalProducts(productsData);
    }
  }, [productsData, originalProducts.length]);

  
  const timeoutIdRef = useRef(null);

  const searchProduct = (term) => {
    if (term === '') {
        setProductsData(originalProducts);
    } else {
      const filteredProducts = originalProducts.filter((product) =>
        product.title.toLowerCase().includes(term.toLowerCase())
      );
      setProductsData(filteredProducts);
    }
  };

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Clear the previous timeout if there's any
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    // Set a new timeout for debounce
    timeoutIdRef.current = setTimeout(() => {
      searchProduct(term);
    }, 500); // Adjust debounce delay as needed
  };

  // Clean up the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);
  
 

  return (
    // {/* Search */}
    <div className="flex flex-1 items-center px-3.5 py-2 text-gray-400 group hover:ring-1 hover:ring-gray-300 focus-within:!ring-2 ring-inset focus-within:!ring-teal-500 rounded-md">
      <svg
        className="mr-2 h-5 w-5 stroke-slate-400"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        className="block w-full appearance-none bg-transparent text-base text-gray-700 placeholder:text-gray-400 focus:outline-none placeholder:text-sm sm:text-sm sm:leading-6"
        placeholder="Find anything..."
        aria-label="Search components"
        id="headlessui-combobox-input-:r5n:"
        role="combobox"
        type="text"
        aria-expanded="false"
        aria-autocomplete="list"
        style={{ caretColor: "rgb(107, 114, 128)" }}
        value={searchTerm}
        onChange={(e) => {
            handleInputChange(e);
        }}
      />
    </div>
  );
}
