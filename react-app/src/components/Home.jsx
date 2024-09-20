import { useEffect, useState } from 'react';
import Header from './Header.jsx'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import Categories from './Categories.jsx'
import { FaHeart } from "react-icons/fa";
import './Home.css'

function Home() {
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);
  const [categoryproducts, setcategoryproducts] = useState([]);
  const [search, setsearch] = useState('');
  const [issearch, setissearch] = useState(false);

  useEffect(() => {
    const url = 'http://localhost:4000/get-products'
    axios.get(url)
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

    const url = 'http://localhost:4000/search?search=' + search + '&loc=' + localStorage.getItem('userLoc');
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
    console.log(value);
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
    if (!userId) {
      alert('Please Login First...')
      return;
    }
    const url = 'http://localhost:4000/liked-products'
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

  const handleProduct = (id) => {
    navigate('/product/' + id)
  };


  return (
    <div>
      <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
      <Categories handleCategory={handleCategory} />
      {issearch && categoryproducts && <h5>SEARCH RESULTS : {<button className="clear-btn" onClick={() => setissearch(false)}> CLEAR</button>}</h5>}
      {issearch && categoryproducts && categoryproducts.length === 0 && <h5> NO RESULTS FOUND</h5>}
      {issearch && <div className="d-flex justify-content-center flex-wrap">
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
      </div>}
      {!issearch && <div className="d-flex justify-content-center flex-wrap">
        {products.length > 0 && products.map((item, index) => {
          return (
            <div onClick={() => { handleProduct(item._id) }} key={item._id} className="card m-3">
              <div onClick={(e) => handleLike(item._id,e)} className='icon-container'>
                <FaHeart className='icons' />
              </div>
              <img width="250px" height="200px" src={`http://localhost:4000/uploads/${item.productimage}`} />
              <p className="m-2 price-text"> ₹ {item.productprice} /-</p>
              <p className="m-2 text-primary"> {item.productname} | {item.productcategory}</p>
              <div className="product-description" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                <p className="m-2 text-primary">{item.productdescription}</p>
              </div>

            </div>
          )
        })}
      </div>}
    </div>
  )
}

export default Home;