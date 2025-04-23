import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css';
import Header from '../components/Header';
import Filter from '../components/Filter';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { TRY_AGAIN } from '../constants/constant';

const ENDPOINT = 'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json';

const Dashboard = () => {

  const [products, setProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const modalRef = useRef();
  const { enqueueSnackbar } = useSnackbar();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(ENDPOINT);
      setProducts(response.data);
      setSearchedProducts(response.data);
    } catch (error) {
      enqueueSnackbar(TRY_AGAIN, { variant: 'error' });
    }
  };

  const searchProducts = (event) => {
    const value = event.target.value;
    if (value || !value.length) {
      searchedProducts(products);
      return;
    }
    const foundProducts = products.filter(product => {
      return product.name.toLowerCase().includes(value);
    });
    setSearchedProducts(foundProducts);
  };

  const openFilter = () => {
    modalRef.current.style.display = 'flex';
  };

  const closeFilter = () => {
    modalRef.current.style.display = 'none';
  };

  useEffect(() => {
    fetchProducts();
  });


  return (
    <>
      <Header />

      <div className="search-container">
        <input type="search" name="search" id="search" placeholder='Search for products...' onKeyDown={searchProducts} />
        <div className="search-button-container" >
          <img src="assets/search.svg" alt="search icon" />
        </div>
        <div className="filter-button-container" onClick={openFilter}>
          <img src="assets/filter.svg" alt="filter icon" />
        </div>
      </div >

      <div className="filter-product-grid-section">
        <div className="filter-section">
          <Filter />
        </div>
        <div className="product-grid-section">product</div>
      </div>
      <div className="filter-modal" ref={modalRef}>
        <div className="filter-section">
          <button onClick={closeFilter}>
            <img src="assets/close.svg" alt="close icon" />
          </button>
          <Filter closeFilter={closeFilter} />
        </div>
      </div>
    </>
  )
}

export default Dashboard;