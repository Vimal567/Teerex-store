import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css';
import Header from '../components/Header';
import Filter from '../components/Filter';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { TRY_AGAIN, ENDPOINT } from '../constants/constant';

const Dashboard = () => {

  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [colourFilterData, setColourFilterData] = useState([]);
  const [genderFilterData, setGenderFilterData] = useState([]);
  const [priceFilterData, setPriceFilterData] = useState([]);
  const [clothTypeFilter, setClothTypeFilter] = useState([]);
  const modalRef = useRef();
  const { enqueueSnackbar } = useSnackbar();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(ENDPOINT);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      enqueueSnackbar(TRY_AGAIN, { variant: 'error' });
    }
  };

  const applyAllFilters = (value) => {
    let updated = [...products];
  
    if (colourFilterData.length) {
      updated = updated.filter((item) => colourFilterData.includes(item.color));
    }
  
    if (genderFilterData.length) {
      updated = updated.filter((item) => genderFilterData.includes(item.gender));
    }
  
    if (clothTypeFilter.length) {
      updated = updated.filter((item) => clothTypeFilter.includes(item.type));
    }
  
    if (priceFilterData.length) {
      updated = updated.filter((item) => {
        return priceFilterData.some((range) => {
          const [min, max] = range.split('-').map(Number);
          return item.price >= min && item.price <= max;
        });
      });
    }
  
    if (value && value.length) {
      updated = updated.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
    }

    setFilteredProducts(updated);
  };

  const initiateSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    applyAllFilters(value);
  };

  const openFilter = () => {
    modalRef.current.style.display = 'flex';
  };

  const closeFilter = () => {
    modalRef.current.style.display = 'none';
  };

  useEffect(() => {
    applyAllFilters(searchValue);
  }, [colourFilterData, genderFilterData, priceFilterData, clothTypeFilter, searchValue]);

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <>
      <Header />

      <div className="search-container">
        <input type="search" name="search" id="search" placeholder='Search for products...' onChange={initiateSearch} />
        <div className="search-button-container" >
          <img src="assets/search.svg" alt="search icon" />
        </div>
        <div className="filter-button-container" onClick={openFilter}>
          <img src="assets/filter.svg" alt="filter icon" />
        </div>
      </div >

      <div className="filter-product-grid-section">
        <div className="filter-section">
        <Filter
            colourFilterData={colourFilterData} 
            setColourFilterData={setColourFilterData} 
            genderFilterData={genderFilterData} 
            setGenderFilterData={setGenderFilterData} 
            priceFilterData={priceFilterData} 
            setPriceFilterData={setPriceFilterData} 
            clothTypeFilter={clothTypeFilter} 
            setClothTypeFilter={setClothTypeFilter} 
          />
        </div>

        <div className="product-grid-section">
          {filteredProducts && filteredProducts.length && filteredProducts.map((product, index) => {
            return <div className="product-card" key={index}>
              <img src={product.imageURL} alt="product" />
              <div className="details-container">
                <span>
                  {product.name}
                </span>
                <span>
                  Rs. {product.price}
                </span>
              </div>
              <button type='button'>Add to Cart</button>
            </div>
          })}
        </div>
      </div>

      <div className="filter-modal" ref={modalRef}>
        <div className="filter-section">
          <button onClick={closeFilter}>
            <img src="assets/close.svg" alt="close icon" />
          </button>
          <Filter 
            colourFilterData={colourFilterData} 
            setColourFilterData={setColourFilterData} 
            genderFilterData={genderFilterData} 
            setGenderFilterData={setGenderFilterData} 
            priceFilterData={priceFilterData} 
            setPriceFilterData={setPriceFilterData} 
            clothTypeFilter={clothTypeFilter} 
            setClothTypeFilter={setClothTypeFilter} 
          />
        </div>
      </div>
    </>
  )
}

export default Dashboard;