import React, { useContext, useState } from "react";
import { ProductContext } from "../Context/ProductContext";

export default function SortByPrice({ showSortList, toggleSortList }) {
  const [sortOrder, setSortOrder] = useState("");

  const { productsData, setProductsData } = useContext(ProductContext);

  const handleSortChange = (sortKey) => {
    setSortOrder(sortKey);
    const sortedData = [...productsData].sort((a, b) => {
      return sortKey === "asc" ? b.price - a.price : a.price - b.price;
    });
    setProductsData(sortedData);
  };

  return (
    //  {/* Sort Start */}
    <div className="flex flex-col">
      {sortOrder && (
        <p className="  text-sm  ">
          Price Sorted by:{" "}
          {sortOrder === "desc" ? "Low to High" : "High to Low"}
        </p>
      )}
      <div className="relative block text-left">
        <button
          type="button"
          className="inline-flex w-full justify-start gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-400 hover:text-gray-500 focus:text-gray-700 transition-all"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleSortList}
        >
          Sort
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Sort Options */}
        <div
          className={`absolute z-10 mt-2 left-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
            showSortList ? "block" : "hidden"
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <span
              className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
              onClick={() => {
                handleSortChange("desc");
                toggleSortList();
              }}
            >
              Low to High
            </span>
            <span
              className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
              onClick={() => {
                handleSortChange("asc");
                toggleSortList();
              }}
            >
              High to Low
            </span>
          </div>
        </div>
      </div>
    </div>

    //    {/* Sort End */}
  );
}
