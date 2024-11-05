import React, { useEffect, useRef, useState } from "react";
import SortByPrice from "../Components/SortByPrice";
import FilterByCategory from "../Components/FilterByCategory";
import SearchBar from "../Components/SearchBar";
import Cart from "../Components/Cart";

export default function ProductListModification() {
  const [showSortList, setShowSortList] = useState(false);
  const toggleSortList = () => {
    setShowSortList(!showSortList);
    setShowFilterList(false);
  };
  const [showFilterList, setShowFilterList] = useState(false); 


  const toggleFilterList = () => {
    setShowFilterList(!showFilterList);
    setShowSortList(false);
  };

  //  if clicked outsite hide list functionality
  const sortRef = useRef(null);
  const filterRef = useRef(null);
  const handleClickOutside = (event) => {
    if (
      sortRef.current &&
      !sortRef.current.contains(event.target) &&
      filterRef.current &&
      !filterRef.current.contains(event.target)
    ) {
      setShowSortList(false);
      setShowFilterList(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
      {/* Sort & Filter*/}
      <div className="w-full flex gap-5 items-center">
        <div className="inline" ref={sortRef}>
          <SortByPrice
            showSortList={showSortList}
            toggleSortList={toggleSortList}
          />
        </div>
        <div className="inline" ref={filterRef}>
          <FilterByCategory
            showFilterList={showFilterList}
            toggleFilterList={toggleFilterList}
          />
        </div>
      </div>
      {/* Search and Cart */}
      <div className="flex gap-2 items-center">
        <SearchBar />
        <Cart />
      </div>
    </div>
  );
}
