import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import { useState } from 'react'
import { FaHeart } from "react-icons/fa";
function Header(props) {
  const [loc, setloc] = useState(null)
  const [showOver, setshowOver] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    navigate('/login')
  }

  let locations = [
    {
      "latitude": 29.863599772552565,
      "longitude": 77.90051656884533,
      "placeName": "Jawahar Bhawan"
    },
    {
      "latitude": 29.865185678618026,
      "longitude": 77.90011093506409,
      "placeName": "Sarojini Bhawan"
    },
    {
      "latitude": 29.870875384632107,
      "longitude": 77.89368748223066,
      "placeName": "Rajendra Bhawan"
    },
    {
      "latitude": 29.871289440868853,
      "longitude": 77.89643308076067,
      "placeName": "Cautley Bhawan"
    },
    {
      "latitude": 29.869679679978066,
      "longitude": 77.89485159559966,
      "placeName": "Rajiv Bhawan"
    },
    {
      "latitude": 29.871096738924997,
      "longitude": 77.8955392542031,
      "placeName": "RadhaKrishnan Bhawan"
    },
    {
      "latitude": 29.87147957621951,
      "longitude": 77.89425887376751,
      "placeName": "Ganga Bhawan"
    },
    {
      "latitude": 29.865428994494604,
      "longitude": 77.89149340517301,
      "placeName": "Azad Bhawan"
    },
    {
      "latitude": 29.86519743110611,
      "longitude": 77.89028471075163,
      "placeName": "MRC Bhawan"
    },
    {
      "latitude": 29.867436981039535,
      "longitude": 77.90108952397583,
      "placeName": "Kasturba Bhawan"
    },
    {
      "latitude": 29.86466351032444,
      "longitude": 77.89279844339035,
      "placeName": "Ravindra Bhawan"
    },
    {
      "latitude": 29.861723026215195,
      "longitude": 77.89407756446556,
      "placeName": "Govind Bhawan"
    },
    {
      "latitude": 29.860791291649893,
      "longitude": 77.89614626400649,
      "placeName": "Himalaya Bhawan"
    },
    {
      "latitude": 29.861536656516044,
      "longitude": 77.89996625980447,
      "placeName": "Vigyan Bhawan"
    },
  ]
  return (
    <div className="header-container d-flex justify-content-between">
      <div className="header">
        <Link className='links' to="/" > $ell&buy </Link>
        <select value={loc} onChange={(e) => {
          localStorage.setItem('userLoc', e.target.value)
          setloc(e.target.value)
        }}>
          {
            locations.map((item, index) => {
              return (
                <option value={`${item.latitude},${item.longitude}`}>
                  {item.placeName}
                </option>
              )
            })
          }

        </select>
        <input className='search' type='text' value={props && props.search}
          onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)} />
        <button className='search-btn' onClick={() => props.handleClick && props.handleClick()}> <FiSearch /></button>
      </div>
      <div>



        <div onClick={() => {
          setshowOver(!showOver)
        }} style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white',
          background: '#002f34', width: '40px', height: '40px', borderRadius: '50%'
        }}>
          N
        </div>
        {showOver && <div style={{
          minHeight: "100px",
          width: '200px',
          zIndex: 1,
          background: '#002f34 ',
          position: 'absolute',
          top: '0',
          right: '0',
          marginTop: '50px',
          marginRight: '50px',
          fontSize: '14px',
          borderRadius: '7px',
          border: '5px solid #A9A9A9'
        }}>
          <div>
            {!!localStorage.getItem('token') && <Link to="/add-product">
              <button className='login-btn'>ADD PRODUCT</button>   </Link>}
          </div>
          <div>
            {!!localStorage.getItem('token') && <Link to="/get-liked-products">
              <button className='login-btn'>FAVOURITES  <FaHeart />
              </button>   </Link>}
          </div>
          <div>
            {!!localStorage.getItem('token') && <Link to="/my-products">
              <button className='login-btn'>MY PRODUCTS</button>   </Link>}
          </div>
          <div>
            {!localStorage.getItem('token') ?
              <Link to="/login"> LOGIN </Link> :
              <button className='login-btn' onClick={handleLogout}>LOGOUT</button>}
          </div>

        </div>}
      </div>

    </div>
  )
}
export default Header;