import { useEffect,useState } from "react";
import Header from "./Header";
import axios from "axios";
import API_URL from "../constants";
function MyProfile() {
  const [user, setuser] = useState({})
  useEffect(() => {
    let url = API_URL + '/my-profile/' + localStorage.getItem('userId')
    axios.get(url)
      .then((res) => {
        if (res.data.user) {
          setuser(res.data.user);
        }
      })
      .catch((err) => {
        alert('server error')
      })

  }, [])
  return (
    <div>
      <Header />
      <div className="m-3 p-3">
        <h3 className='text-center mt-2'> USER PROFILE</h3>
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <td>USERNAME</td>
              <td> G-SUITE ID</td>
              <td> MOBILE NO.</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> {user.username}</td>
              <td> {user.gsuiteid}</td>
              <td> {user.mobile}</td>
            </tr>

          </tbody>

        </table>
      </div>

    </div>
  )
}
export default MyProfile;