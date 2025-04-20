import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Header from '../components/Header';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { TRY_AGAIN } from '../constants/constant';

const ENDPOINT = 'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json';

const Dashboard = () => {

  const [products, setProducts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(ENDPOINT);
      setProducts(response.data);
    } catch (error) {
      enqueueSnackbar(TRY_AGAIN, { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <>
      <Header />
      <div className="search-container">
        <input type="search" name="search" id="search" placeholder='Search for products...' />
        <div className="search-button-container">
          <img src="assets/search.svg" alt="search icon" />
        </div>
        <div className="filter-button-container">
          <img src="assets/filter.svg" alt="filter icon" />
        </div>
      </div>
    </>
  )
}

export default Dashboard;