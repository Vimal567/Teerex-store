import React, { useState, useEffect, useRef, useContext, Fragment } from 'react';
import './LandingPage.css';
import Filter from '../../components/Filter/Filter';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { TRY_AGAIN, ENDPOINT } from '../../constants/constants';
import CartContext from '../../context/cart-context';

const LandingPage = () => {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [colourFilterData, setColourFilterData] = useState([]);
  const [genderFilterData, setGenderFilterData] = useState([]);
  const [priceFilterData, setPriceFilterData] = useState([]);
  const [clothTypeFilter, setClothTypeFilter] = useState([]);
  const modalRef = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const { addToCart } = useContext(CartContext);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(ENDPOINT);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(TRY_AGAIN, { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const applyAllFilters = (value) => {
    let updatedProducts = [...products];

    if (colourFilterData.length) {
      updatedProducts = updatedProducts.filter((item) => colourFilterData.includes(item.color));
    }

    if (genderFilterData.length) {
      updatedProducts = updatedProducts.filter((item) => genderFilterData.includes(item.gender));
    }

    if (clothTypeFilter.length) {
      updatedProducts = updatedProducts.filter((item) => clothTypeFilter.includes(item.type));
    }

    if (priceFilterData.length) {
      updatedProducts = updatedProducts.filter((item) => {
        return priceFilterData.some((range) => {
          const [min, max] = range.split('-').map(Number);
          return item.price >= min && item.price <= max;
        });
      });
    }

    if (value && value.length) {
      updatedProducts = updatedProducts.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
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

  const formatCurrency = (price, currency) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    applyAllFilters(searchValue);
  }, [colourFilterData, genderFilterData, priceFilterData, clothTypeFilter, searchValue]);

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <>
      {isLoading ? <div className='loading-container'>Loading Please wait...</div> : <Fragment>
        <div className="search-container">
          <input type="search" name="search" id="search" placeholder='Search for products...' onChange={initiateSearch} />
          <div className="search-icon-container" >
            <img src="assets/search-icon.svg" alt="search icon" />
          </div>
          <div className="filter-button-container" onClick={openFilter}>
            <img src="assets/filter-icon.svg" alt="filter icon" />
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
            {filteredProducts && filteredProducts.length ? filteredProducts.map((product, index) => {
              return <div className="product-card" key={index}>
                <img src={product.imageURL} alt="product" />
                <div className="details-container">
                  <span>
                    {product.name}
                  </span>
                  <span>
                    {formatCurrency(product.price, product.currency)}
                  </span>
                </div>
                <button type='button' onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            }) :
              <div className='no-products-found'>
                No products found
              </div>}
          </div>
        </div>

        <div className="filter-modal" ref={modalRef}>
          <div className="filter-section">
            <button type='button' title='close' onClick={closeFilter}>
              <img src="assets/close-icon.svg" alt="close icon" />
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
      </Fragment>}
    </>
  )
}

export default LandingPage;