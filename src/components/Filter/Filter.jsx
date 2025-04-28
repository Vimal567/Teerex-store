import "./Filter.css";
import { COLOURS_LIST, GENDER_LIST, PRICE_LIST, CLOTH_TYPE_LIST } from '../../constants/constant';

const Filter = ({
  colourFilterData,
  setColourFilterData,
  genderFilterData,
  setGenderFilterData,
  priceFilterData,
  setPriceFilterData,
  clothTypeFilter,
  setClothTypeFilter
}) => {

  const onFilterChange = (event, filterSetter) => {
    const { checked, value } = event.target;
    if (checked) {
      filterSetter((prev) => [...prev, value]);
    } else {
      filterSetter((prev) => prev.filter((item) => item !== value));
    }
  };

  return (
    <form>
      <h2>Color</h2>
      <div className="filter-container">
        {COLOURS_LIST.map((colour, index) => (
          <div className='form-group' key={index}>
            <input
              type="checkbox"
              value={colour}
              checked={colourFilterData.includes(colour)}
              onChange={(event) => onFilterChange(event, setColourFilterData)}
            />
            <label>{colour}</label>
          </div>
        ))}
      </div>

      <h2>Gender</h2>
      <div className="filter-container">
        {GENDER_LIST.map((gender, index) => (
          <div className='form-group' key={index}>
            <input
              type="checkbox"
              value={gender}
              checked={genderFilterData.includes(gender)}
              onChange={(event) => onFilterChange(event, setGenderFilterData)}
            />
            <label>{gender}</label>
          </div>
        ))}
      </div>

      <h2>Price</h2>
      <div className="filter-container">
        {PRICE_LIST.map((priceValue, index) => (
          <div className='form-group' key={index}>
            <input
              type="checkbox"
              value={priceValue}
              checked={priceFilterData.includes(priceValue)}
              onChange={(event) => onFilterChange(event, setPriceFilterData)}
            />
            <label>{priceValue}</label>
          </div>
        ))}
      </div>

      <h2>Type</h2>
      <div className="filter-container">
        {CLOTH_TYPE_LIST.map((productType, index) => (
          <div className='form-group' key={index}>
            <input
              type="checkbox"
              value={productType}
              checked={clothTypeFilter.includes(productType)}
              onChange={(event) => onFilterChange(event, setClothTypeFilter)}
            />
            <label>{productType}</label>
          </div>
        ))}
      </div>
    </form>
  );
};

export default Filter;