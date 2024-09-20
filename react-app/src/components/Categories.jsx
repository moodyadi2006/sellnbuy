import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import categories from './categoriesList';
function Categories(props) {
  const navigate = useNavigate();
  return (
    <div className="category-container">
      <span>All Categories</span>
      {categories && categories.length > 0 &&
        categories.map((item, index) => {
          return (
            <span onClick={() => {
              console.log(navigate('/productcategory/' + item))
              navigate('/productcategory/' + item)
            }} key={index} className='category'> {item} </span>
          )
        })}
    </div>
  )
}
export default Categories;