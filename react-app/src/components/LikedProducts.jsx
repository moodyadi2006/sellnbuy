import { useEffect } from 'react';
import Header from './Header.jsx'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import Categories from './Categories.jsx'
import { FaHeart } from "react-icons/fa";
import './Home.css'
function LikedProducts() {
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);
  const [categoryproducts, setcategoryproducts] = useState('');
  const [search, setsearch] = useState('');

  useEffect(() => {
    const url = 'http://localhost:4000/get-liked-products'
    let data={userId: localStorage.getItem('userId')}
    axios.post(url,data)
      .then((res) => {
        if (res.data.products) {
          setproducts(res.data.products);
        }
      })
      .catch((err) => {
        alert('server error')
      })
  }, [])


  const handlesearch = (value) => {
    setsearch(value);
  }
  const handleClick = () => {
    let filteredProducts = products.filter((item) => {
      if (item.productname.toLowerCase().includes(search.toLowerCase())
        || item.productdescription.toLowerCase().includes(search.toLowerCase())
        || item.productcategory.toLowerCase().includes(search.toLowerCase())) {
        return item;
      }
    })
    setcategoryproducts(filteredProducts);
  }
  const handleCategory = (value) => {
    let filteredProducts = products.filter((item) => {
      if (item.productcategory === value) {
        return item;
      }
    })
    setcategoryproducts(filteredProducts);

  }
  const handleLike = (productId) => {
    let userId = localStorage.getItem('userId');
    console.log(productId, userId);
    const url = 'http://localhost:4000/liked-products'
    const data={userId,productId}
    axios.post(url,data)
      .then((res) => {
        if(res.data.message){
          alert('Liked successfully....')
        }
      })
      .catch((err) => {
        alert('server error')
      })
  }
  return (
    <div>
      <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
      <Categories handleCategory={handleCategory} />
      <div className="d-flex justify-content-center flex-wrap">
        {categoryproducts && categoryproducts.length > 0 && categoryproducts.map((item, index) => {
          return (
            <div key={item._id} className="card m-3">
              <div onClick={() => handleLike(item._id)} className='icon-container'>
                <FaHeart className='icons' />
              </div>
              <img width="300px" height="200px" src={`http://localhost:4000/uploads/${item.productimage}`} />
              <p className="m-2 text-primary"> {item.productname} | {item.productcategory}</p>
              <div className="product-description" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                <p className="m-2 text-primary">{item.productdescription}</p>
              </div>
              <p className="m-2 text-primary"> {item.productprice} </p>
            </div>
          )
        })}
      </div>
      <h5> MY WISHLIST : </h5>
      <div className="d-flex justify-content-center flex-wrap">
        {products && products.length > 0 && products.map((item, index) => {
          return (
            <div key={item._id} className="card m-3">
              <div onClick={() => handleLike(item._id)} className='icon-container'>
                <FaHeart className='icons' />
              </div>
              <img width="300px" height="200px" src={`http://localhost:4000/uploads/${item.productimage}`} />

              <p className="m-2 text-primary"> {item.productname} | {item.productcategory}</p>
              <div className="product-description" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                <p className="m-2 text-primary">{item.productdescription}</p>
              </div>
              <p className="m-2 text-primary"> {item.productprice} </p>
            </div>
          )
        })}
      </div>
    </div>)
}
export default LikedProducts;