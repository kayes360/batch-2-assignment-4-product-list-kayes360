import React, { useContext, useEffect, useRef, useState } from "react";
import ProductCard from "../Components/ProductCard";
import ProductCardSkeleton from "../Components/ProductCardSkeleton";
import ProductListModification from "../Components/ProductListModification"; 
import { ProductContext } from "../Context/ProductContext";

export default function ProductList() {
  //get all products - https://fakestoreapi.com/products
  // get all category - 'https://fakestoreapi.com/products/categories
  //get all by category - 'https://fakestoreapi.com/products/category/jewelery' 
  //sort by asc - 'https://fakestoreapi.com/products?sort=asc'
  //sort by desc - 'https://fakestoreapi.com/products?sort=desc'
  const { productsData, error, loading } = useContext(ProductContext);  
  let content;

  if (error) {
    content = (
      <p className="mt-4 text-xl text-gray-500 text-center">
        Error fetching Product data {error.message}
      </p>
    );
  }
  else if (loading) {
    content = (
      <>
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </>
    );
   
  }
  else if (productsData.length === 0) {
      content = (
        <p className="mt-4 text-xl text-gray-500 text-center">
          No Product Found
        </p>
      );
    }
   else if (productsData.length > 0) {
      content =  (
        productsData.map((productData) => <ProductCard key={productData.id} productData={productData}/>)
      )
    }

  return (
    <div>
      <div className="pt-16 sm:pt-24 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-center">
            New Arrivals
          </h1>
          <p className="mt-4 text-xl text-gray-500 text-center">
            Thoughtfully designed objects for the workspace, home, and travel.
          </p>
        </div>
        <div className="mt-10">
          <ProductListModification />
        </div>
        <div>
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {/* Card */}

                {content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
