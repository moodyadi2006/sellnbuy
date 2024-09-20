import Header from './Header.jsx';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import API_URL from '../constants'
function Login() {
  const navigate = useNavigate();
  const [username, setusername] = useState('')
  const [gsuiteid, setgsuiteid] = useState('')
  const [password, setpassword] = useState('')
  const handleApi = () => {
    console.log({ username, gsuiteid, password })
    const url = API_URL + '/login'
    const data = { username, gsuiteid, password }
    axios.post(url, data)
      .then((res) => {
        console.log(res.data)
        if (res.data.message) {
          if (res.data.token) {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userId', res.data.userId)
            navigate('/');
          }
        }
      })
      .catch((err) => {
        console.log(err)
        alert('server error')
      })
  }
  return (
    <div>
      <Header />
      <div className=' p-3 m-3'>
        <h3>Welcome to login page...</h3>
        <br></br>
        USERNAME
        <input className='form-control' type="text" value={username} onChange={(event) => {
          setusername(event.target.value)
        }} />
        <br></br>
        G-SUITEID
        <input className='form-control' type="email" value={gsuiteid} onChange={(event) => {
          setgsuiteid(event.target.value)
        }} />
        <br></br>
        PASSWORD
        <input className='form-control' type="text" value={password} onChange={(event) => {
          setpassword(event.target.value)
        }} />
        <br></br>
        <button className=" btn btn-primary mr-3" onClick={handleApi} >Login</button>
        <Link className=" m-3" to="/signup"> SIGNUP</Link>
      </div>
    </div>
  )
}
export default Login;