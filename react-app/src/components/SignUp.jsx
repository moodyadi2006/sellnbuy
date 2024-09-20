import Header from './Header.jsx';
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import API_URL from '../constants';
function SignUp() {
  const [username, setusername] = useState('')
  const [gsuiteid, setgsuiteid] = useState('')
  const [password, setpassword] = useState('')
  const [mobile, setmobile] = useState('')
  const handleApi = () => {
    const url = API_URL + '/signup'
    const data = { username, gsuiteid, password, mobile }
    axios.post(url, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.message) {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Server error');
      });
  }
  return (
    <div >
      <Header />
      <div className=' p-3 m-3'>
        <h3>Welcome to SignUp page...</h3>
        <br></br>
        USERNAME
        <input className='form-control' type="text" value={username} onChange={(event) => {
          setusername(event.target.value)
        }} />
        <br></br>
        MOBILE NO.
        <input className='form-control' type="text" value={mobile} onChange={(event) => {
          setmobile(event.target.value)
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
        <button className='btn btn-primary mr-3' onClick={handleApi}>SIGNUP</button>
        <Link className=" m-3" to="/login"> LOGIN</Link>
      </div>
    </div>
  )
}
export default SignUp;