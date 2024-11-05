import { useEffect, useState } from "react";

const useProducts = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const fetchProductsData = async (category="") => {
    try {
      setLoading(true); 
      const url =  category ? `https://fakestoreapi.com/products/category/${category}` : "https://fakestoreapi.com/products" 
      const response = await fetch(url);
      if (!response.ok) {
        const errorMessage = `Fetching product data failed : ${response.status}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      
      setProductsData(data); 
      setLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);
  return {
    productsData,
    setProductsData,
    loading,
    error,
    fetchProductsData
  };
};
export default useProducts;
