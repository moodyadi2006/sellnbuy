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
      "latitude": 28.6139,
      "longitude": 77.2090,
      "placeName": "New Delhi,Delhi"
    },
    {
      "latitude": 19.0760,
      "longitude": 72.8777,
      "placeName": "Mumbai,Maharashtra"
    },
  ]
  return (
    <div className="header-container d-flex justify-content-between">
      <div className="header">
        <Link className='links' to="/" > HOME </Link>
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
          top: 0,
          right: 0,
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