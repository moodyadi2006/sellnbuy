import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Header from './Header.jsx';
import API_URL from '../constants';
function ProductDetail() {
  const [product, setproduct] = useState();
  const [user, setuser] = useState();
  const p = useParams();
  useEffect(() => {
    const url = API_URL + '/get-product/' + p.productId;
    axios.get(url)
      .then((res) => {
        if (res.data.product) {
          setproduct(res.data.product)
        }
      })
      .catch((err) => {
        alert('server error')
      })
  }, [])

  const handleContact = (addedBy) => {
    console.log(addedBy)
    const url = API_URL + '/get-user/' + addedBy;
    axios.get(url)
      .then((res) => {
        if (res.data.user) {
          setuser(res.data.user)
        }
      })
      .catch((err) => {
        alert('server error')
      })
  }
  return (
    <>
      <Header />
      PRODUCT DETAILS :
      <div>
        {product &&
          <div className="d-flex justify-content-between flex-wrap" >
            <div> <img width="300px" height="200px" src={process.env.REACT_APP_BASE_URL + `/uploads/${product.productimage}`} />
              <img width="300px" height="200px" src={process.env.REACT_APP_BASE_URL + `/uploads/${product.productimage2}`} /></div>
            <div>
              <h3 className="m-2 text-primary"> ₹ {product.productprice} /-</h3>
              <p className="m-2 text-primary"> {product.productname} | {product.productcategory}</p>
              <p className="m-2 text-primary">{product.productdescription}</p>
              {product.addedBy &&
                <button onClick={() => handleContact(product.addedBy)}> SHOW CONTACT DETAILS</button>}
              {user && user.username && <h4> {user.username} </h4>}
              {user && user.gsuiteid && <h4> {user.gsuiteid} </h4>}
              {user && user.mobile && <h4> {user.mobile} </h4>}
            </div>
          </div >
        }
      </div >
    </>
  )
}
export default ProductDetail;