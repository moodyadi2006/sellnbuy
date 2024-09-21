import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import API_URL from '../constants';
import io from 'socket.io-client';
let socket;
function ProductDetail() {
  const p = useParams();
  const [product, setproduct] = useState();
  const [user, setuser] = useState('');
  const [msg, setmsg] = useState();
  const [msgs, setmsgs] = useState([]);
  useEffect(() => {
    socket = io(API_URL)
    socket.on('connect', () => {
      console.log('Connected')
    })
  }, [])

  useEffect(() => {
    socket.on('getMsg', (data) => {
      console.log(data, 'data');
      const _data = data.filter((item, index) => {
        return item.productId === p.productId
      })
      setmsgs(_data)
    })
  }, [p.productId]);
  
  useEffect(() => {
    const url = API_URL + '/get-product/' + p.productId;
    axios.get(url)
      .then((res) => {
        if (res.data.product) {
          setproduct(res.data.product)
          localStorage.setItem('productId', res.data.product._id)
        }
      })
      .catch((err) => {
        alert('server error')
      })
  }, [])

  const handleContact = (addedBy) => {
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

  const handleSend = () => {
    const data = { username: localStorage.getItem('userName'), msg, productId: localStorage.getItem('productId') }
    socket.emit('sendMsg', data)
    setmsg('')
  }
  return (
    <>
      <Header />
      PRODUCT DETAILS :
      <div>
        {product &&
          <div className="d-flex justify-content-between flex-wrap" >
            <div>
              <img width="300px" height="200px" src={API_URL + `/uploads/${product.productimage}`} />  {/*Remember */}
              {product.productimage2 && <img width="300px" height="200px" src={API_URL + `/uploads/${product.productimage2}`} />} {/*product.productimage2 new thing added */}
              <h6> PRODUCT DETAILS : </h6>
              {product.productdescription}
              <h3 className="m-2 price-text"> ₹ {product.productprice} /-</h3>
              <p className="m-2 text-primary"> {product.productname} | {product.productcategory}</p>
              <p className="m-2 text-success">{product.productdescription}</p>
              {product.addedBy &&
                <button onClick={() => handleContact(product.addedBy)}> SHOW CONTACT DETAILS</button>}
              {user && user.username && <h4> {user.username} </h4>}
              {user && user.gsuiteid && <h4> {user.gsuiteid} </h4>}
              {user && user.mobile && <h4> {user.mobile} </h4>}
            </div>
            <div>
              CHATS
              {
                msgs && msgs.length > 0 && msgs.map((item, index) => {
                  if (item.username === localStorage.getItem('userName')) {
                    return (
                      <p key={item._id} style={{ marginRight: '100px', background: '#002f34', borderRadius: '5px', color: 'white' }}> {item.username} : {item.msg}</p>
                    )
                  }
                  if (item.username !== localStorage.getItem('userName')) {
                    return (
                      <p key={item._id} style={{ marginLeft: '100px', background: '#037581', borderRadius: '5px', color: 'white' }}> {item.username} : {item.msg}</p>
                    )
                  }
                })
              }
              <input value={msg} onChange={(e) => setmsg(e.target.value)} className="form-control" type="text" />
              <button onClick={handleSend} className='btn btn-primary'> SEND</button>
            </div>
          </div >
        }
      </div >
    </>
  )
}
export default ProductDetail;