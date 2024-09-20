import Header from './Header.jsx'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios'
import categories from './categoriesList.js'
import API_URL from '../constants.js';
function AddProduct() {
  const navigate = useNavigate();
  const [productname, setproductname] = useState('');
  const [productdescription, setproductdescription] = useState('');
  const [productprice, setproductprice] = useState('');
  const [productcategory, setproductcategory] = useState('');
  const [productimage, setproductimage] = useState('');
  const [productimage2, setproductimage2] = useState('');
  // const [productimage3, setproductimage3] = useState('');
  // const [productimage4, setproductimage4] = useState('');
  // const [productimage5, setproductimage5] = useState('');
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [])


  const handleApi = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const formdata = new FormData();
      formdata.append('productlatitude', position.coords.latitude);
      formdata.append('productlongitude', position.coords.longitude);
      formdata.append('productname', productname);
      formdata.append('productdescription', productdescription);
      formdata.append('productprice', productprice);
      formdata.append('productcategory', productcategory);
      formdata.append('productimage', productimage);
      formdata.append('productimage2', productimage2);
      // formdata.append('productimage2', productimage2);
      // formdata.append('productimage3', productimage3);
      // formdata.append('productimage4', productimage4);
      // formdata.append('productimage5', productimage5);
      formdata.append('userId', localStorage.getItem('userId'));
      const url = API_URL + '/add-product'
      axios.post(url, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          if (res.data.message) {
            alert(res.data.message)
            navigate('/');
          }
        })
        .catch((err) => {
          alert('Servers err');
        })

    })

  }
  return (
    <div>
      <Header />
      <div className="p-3">
        <h2> ADD PRODUCT HERE : </h2>
        <label> Product Name</label>
        <input className='form-control' type='text' value={productname}
          onChange={(event) => {
            setproductname(event.target.value)
          }} />
        <label> Product Description</label>
        <input className='form-control' type='text' value={productdescription}
          onChange={(event) => {
            setproductdescription(event.target.value)
          }}
        />
        <label> Product Price</label>
        <input className='form-control' type='text' value={productprice}
          onChange={(event) => {
            setproductprice(event.target.value)
          }}
        />
        <label> Product Category</label>
        <select className="form-control" value={productcategory}
          onChange={(event) => {
            setproductcategory(event.target.value)
          }}
        >
          <option>  Academic Items  </option>
          <option>  Technology Items  </option>
          <option>  Furniture Items  </option>
          <option>  Clothing and Accessories  </option>
          <option>  Household Items  </option>
          <option>  Sports and Outdoor Equipments  </option>
          <option>  Personal Care Items  </option>
          <option>  Miscellaneous Items  </option>
          {
            categories && categories.length > 0 &&
            categories.map((item, index) => {
              return (
                <option key={'option' + index}>  {item} </option>
              )

            })
          }
        </select>
        <label> Product's First Image</label>
        <input className='form-control' type='file'
          onChange={(event) => {
            setproductimage(event.target.files[0])
          }}
        />
        <label> Product's Second Image</label>
        <input className='form-control' type='file'
          onChange={(event) => {
            setproductimage2(event.target.files[0])
          }}
        />
        {/* <label> Product's Second Image</label>
        <input className='form-control' type='file'
          onChange={(event) => {
            setproductimage2(event.target.files[0])
          }}
        />
        <label> Product's Third Image</label>
        <input className='form-control' type='file'
          onChange={(event) => {
            setproductimage3(event.target.files[0])
          }}
        />
        <label> Product's Fourth Image</label>
        <input className='form-control' type='file'
          onChange={(event) => {
            setproductimage4(event.target.files[0])
          }}
        />
        <label> Product's Fifth Image</label>
        <input className='form-control' type='file'
          onChange={(event) => {
            setproductimage5(event.target.files[0])
          }}
        /> */}
        <button onClick={handleApi} className="btn btn-primary mt-3"> SUBMIT </button>
      </div>
    </div>)
}
export default AddProduct;