import { useEffect, useState } from 'react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Categories from './Categories';
import { FaHeart } from "react-icons/fa";
import './Home.css'
import API_URL from '../constants';
function LikedProducts() {
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);
  const [categoryproducts, setcategoryproducts] = useState([]);
  const [search, setsearch] = useState('');

  useEffect(() => {
    const url = API_URL + '/get-liked-products'
    let data = { userId: localStorage.getItem('userId') }
    axios.post(url, data)
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
    let filteredProducts = products.filter((item, index) => {
      if (item.productcategory === value) {
        return item;
      }
    })
    setcategoryproducts(filteredProducts);

  }
  const handleLike = (productId) => {
    let userId = localStorage.getItem('userId');
    const url = API_URL + '/liked-products';
    const data = { userId, productId }
    axios.post(url, data)
      .then((res) => {
        if (res.data.message) {
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
      <h5> SEARCH RESULTS : </h5> {/* Remember */}
      <div className="d-flex justify-content-center flex-wrap">
        {categoryproducts && categoryproducts.length > 0 && categoryproducts.map((item, index) => {
          return (
            <div key={item._id} className="card m-3">
              <div onClick={() => handleLike(item._id)} className='icon-container'>
                <FaHeart className='icons' />
              </div>
              <img width="300px" height="200px" src={API_URL + `/uploads/${item.productimage}` } /> {/*Remember */}
              <p className="m-2 text-primary"> {item.productname} | {item.productcategory}</p>
              <p className="m-2 text-danger"> ₹ {item.productprice} /-</p>
              <p className="m-2 text-success">{item.productdescription}</p>
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
                <FaHeart className='red-icons' />
              </div>
              <img width="300px" height="200px" src={API_URL + `/uploads/${item.productimage}`} /> {/*Remember */}

              <p className="m-2 text-primary"> {item.productname} | {item.productcategory}</p>
              <h3 className="m-2 text-danger"> {item.productprice} </h3>
              <p className="m-2 text-success">{item.productdescription}</p>

            </div>
          )
        })}
      </div>
    </div>)
}
export default LikedProducts;