import { useEffect } from 'react';
import Header from './Header.jsx'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios"
import Categories from './Categories.jsx'
import { FaHeart } from "react-icons/fa";
import './Home.css'
import API_URL from '../constants.js';
function CategoryPage() {
  const navigate = useNavigate();
  const param = useParams();
  const [products, setproducts] = useState([]);
  const [categoryproducts, setcategoryproducts] = useState('');
  const [search, setsearch] = useState('');
  const [issearch, setissearch] = useState(false);
  const [likedproducts, setlikedproducts] = useState([]);
  const [refresh, setrefresh] = useState(false);
  useEffect(() => {
    const url = API_URL + '/get-products?catName=' + param.catName;
    axios.get(url)
      .then((res) => {
        if (res.data.products) {
          setproducts(res.data.products);
          setcategoryproducts(res.data.products);
          console.log(products);
          console.log(categoryproducts);
        }
      })
      .catch((err) => {
        alert('server error')
      })
    const url2 = API_URL + '/get-liked-products'
    let data = { userId: localStorage.getItem('userId') }
    axios.post(url2, data)
      .then((res) => {
        if (res.data.products) {
          setlikedproducts(res.data.products);
        }
      })
      .catch((err) => {
        alert('server error')
      })
  }, [param, refresh])


  const handlesearch = (value) => {
    setsearch(value);
  }
  const handleClick = () => {
    const url = API_URL + '/search?search=' + search + '&loc=' + localStorage.getItem('userLoc');
    axios.get(url)
      .then((res) => {
        setcategoryproducts(res.data.products);
        setissearch(true);
      })
      .catch((err) => {
        alert('server error')
      })
  }
  const handleCategory = (value) => {
    let filteredProducts = products.filter((item) => {
      if (item.productcategory === value) {
        return item;
      }
    })
    setcategoryproducts(filteredProducts);

  }
  const handleLike = (productId, e) => {
    e.stopPropagation();
    let userId = localStorage.getItem('userId');
    const url = API_URL + 'liked-products'
    const data = { userId, productId }
    axios.post(url, data)
      .then((res) => {
        if (res.data.message) {
          alert('Liked successfully....')
          setrefresh(!refresh);
        }
      })
      .catch((err) => {
        alert('server error')
      })
  }
  const handleDisLike = (productId, e) => {
    e.stopPropagation();
    let userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please Login First...')
      return;
    }
    const url = API_URL + '/disliked-products'
    const data = { userId, productId }
    axios.post(url, data)
      .then((res) => {
        if (res.data.message) {
          alert('DisLiked successfully....')
          setrefresh(!refresh)
        }
      })
      .catch((err) => {
        alert('server error')
      })
  }
  const handleProduct = (id) => {
    navigate('/product/' + id)
  }
  return (
    <div>
      <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
      <Categories handleCategory={handleCategory} />
      {issearch && categoryproducts &&
        <h5>SEARCH RESULTS :
          <button className='clear-btn' onClick={() => setissearch(false)}>CLEAR
          </button>
        </h5>}
      {issearch && categoryproducts && categoryproducts.length == 0 && <h5> NO RESULTS FOUND</h5>}
      {issearch && <div className="d-flex justify-content-center flex-wrap">
        {categoryproducts && categoryproducts.length > 0 && categoryproducts.map((item, index) => {
          return (
            <div key={item._id} className="card m-3">
              <div onClick={() => handleLike(item._id)} className='icon-container'>
                <FaHeart className='icons' />
              </div>
              <img width="300px" height="200px" src={process.env.REACT_APP_BASE_URL + `/uploads/${item.productimage}`} />
              <p className="m-2 text-primary"> {item.productname} | {item.productcategory}</p>
              <div className="product-description" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                <p className="m-2 text-primary">{item.productdescription}</p>
              </div>
              <p className="m-2 text-primary"> {item.productprice} </p>
            </div>
          )
        })}
      </div>}
      {issearch && <div className="d-flex justify-content-center flex-wrap">
        {products && products.length > 0 && products.map((item, index) => {
          return (
            <div onClick={() => { handleProduct(item._id) }} key={item._id} className="card m-3">
              <div className='icon-container'>
                {
                  likedproducts.find((likedItem) =>
                    likedItem._id === item._id
                  ) ?
                    <FaHeart onClick={(e) => handleDisLike(item._id, e)} className='red-icons' /> :
                    <FaHeart onClick={(e) => handleLike(item._id, e)} className='icons' />
                }
              </div>
              <img width="250px" height="200px" src={process.env.REACT_APP_BASE_URL + `/uploads/${item.productimage}`} />
              <p className="m-2 price-text"> ₹ {item.productprice} /-</p>
              <p className="m-2 text-primary"> {item.productname} | {item.productcategory}</p>
              <div className="product-description" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                <p className="m-2 text-primary">{item.productdescription}</p>
              </div>
            </div>
          )
        })}
      </div>}
    </div>)
}
export default CategoryPage;