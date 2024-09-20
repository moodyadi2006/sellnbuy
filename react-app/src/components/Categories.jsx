import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import categories from './categoriesList';
import { useState } from 'react';

function Categories() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // const handleCategoryClick = (item) => {
  //   navigate('/productcategory/' + item);
  //   setIsOpen(false);
  // };  Remember

  return (
    <div className="category-container" style={{ cursor: "pointer" }}>
      <button
        onClick={toggleDropdown}
        style={{
          cursor: 'pointer',
          backgroundColor: '#002f34',
          color: 'white',
          border: 'none',
          height: '30px',
          width: '160px',
          borderRadius: '3px',
          marginRight: '10px'
        }}
      >
        All Categories
        <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" className="custom-icon" fillRule="evenodd">
          <path className="rui-w4DG7" d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path>
        </svg>
      </button>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {categories.map((item, index) => (
          <span
            onClick={() => navigate('/productcategory/' + item)}  //handleCategoryClick(item)
            key={index}
            className="category"
            style={{
              cursor: 'pointer',
              margin: '3px'
            }}
          >
            {item}
          </span>
        ))}
      </div>
      {isOpen && (
        <div className="dropdown">
          {categories.map((item, index) => (
            <span
              onClick={() => navigate('/productcategory/' + item)}
              key={index}
              className="category"
              style={{ display: 'block', cursor: 'pointer' }}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;
