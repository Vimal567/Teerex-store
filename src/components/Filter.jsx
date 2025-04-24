import React, { useState } from 'react';
import "./Filter.css";

const colours = ["Red", "Blue", "Green"];
const gender = ["Men", "Women"];
const price = ["0 - 250", "250 - 450", "450 - 100000"];
const clothType = ["Polo", "Hoddie", "Basic"];

const Filter = () => {

  const [colourFilterData, setColourFilterData] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);
  const [priceFilterData, setPriceFilterData] = useState([]);
  const [clothTypeFilter, setClothTypeFilter] = useState([]);

  const onFilterColorChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setColourFilterData((prevState) => [...prevState, event.target.value]);
    } else {
      setColourFilterData((prevState) =>
        prevState.filter((item) => item !== event.target.value)
      );
    }
  };

  const onFilterGenderChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setGenderFilter((prevState) => [...prevState, event.target.value]);
    } else {
      setGenderFilter((prevState) =>
        prevState.filter((item) => item !== event.target.value)
      );
    }
  };

  const onFilterPriceChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setPriceFilterData((prevState) => [...prevState, event.target.value]);
    } else {
      setPriceFilterData((prevState) =>
        prevState.filter((item) => item !== event.target.value)
      );
    }
  };

  const onFilterClothTypeChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setClothTypeFilter((prevState) => [...prevState, event.target.value]);
    } else {
      setClothTypeFilter((prevState) =>
        prevState.filter((item) => item !== event.target.value)
      );
    }
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
              onChange={onFilterColorChange}
            />
            <label>
              {colour}
            </label>
          </div>
        ))}
      </div>

      <h2>Gender</h2>
      <div className="filter-container">
        {gender.map((gender, index) => (
          <div className='form-group' key={index}>
            <input
              type="checkbox"
              value={gender}
              checked={genderFilter.includes(gender)}
              onChange={onFilterGenderChange}
            />
            <label>
              {gender}
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
              onChange={onFilterPriceChange}
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
              checked={clothTypeFilter.includes(productType)}
              onChange={onFilterClothTypeChange}
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