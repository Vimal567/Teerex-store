import React, { useState, useEffect } from 'react';
import "./Filter.css";

const colours = ["Red", "Blue", "Green"];
const gender = ["Men", "Women"];
const price = ["0 - 250", "250 - 450", "450 - 100000"];
const clothType = ["Polo", "Hoddie", "Basic"];

const Filter = () => {

  const [colourFilterData, setColourFilterData] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);
  const [priceFilterData, setPriceFilterData] = useState([]);
  const [productTypeFilter, setProductTypeFilter] = useState([]);

  const handleColourFilterChange = () => {

  };
  const handleGenderFilterChange = () => {

  };
  const handlePriceFilterChange = () => {

  };
  const handleProductTypeFilter = () => {

  };

  return (
    <>
    <form>
      <h2>Color</h2>
      <div className="filter-container">
        {colours.map((colour, index) => (
          <div className='form-group' key={index}>
            <input
              type="checkbox"
              value={colour}
              checked={colourFilterData.includes(colour)}
              onChange={handleColourFilterChange}
            />
            <label>
              {colour}
            </label>
          </div>
        ))}
      </div>

      <h2>Gender</h2>
      <div className="filter-container">
        {gender.map((gen, index) => (
          <div className='form-group' key={index}>
            <input
              type="checkbox"
              value={gen}
              checked={genderFilter.includes(gen)}
              onChange={handleGenderFilterChange}
            />
            <label>
              {gen}
            </label>
          </div>
        ))}
      </div>

      <h2>Price</h2>
      <div className="filter-container">
        {price.map((priceValue, index) => (
          <div className='form-group' key={index}>
            <input
              type="checkbox"
              value={priceValue}
              checked={priceFilterData.includes(priceValue)}
              onChange={handlePriceFilterChange}
            />
            <label>
              {priceValue}
            </label>
          </div>
        ))}
      </div>

      <h2>Type</h2>
      <div className="filter-container">
        {clothType.map((productType, index) => (
          <div className='form-group' key={index}>
            <input
              type="checkbox"
              value={productType}
              checked={productTypeFilter.includes(productType)}
              onChange={handleProductTypeFilter}
            />
            <label>
              {productType}
            </label>
          </div>
        ))}
      </div>
    </form>
  </>
  )
}

export default Filter;