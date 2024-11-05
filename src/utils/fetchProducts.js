export const fetchAllProducts = async () => { 
    const result = await fetch('https://fakestoreapi.com/products')
    return result.json();
 }