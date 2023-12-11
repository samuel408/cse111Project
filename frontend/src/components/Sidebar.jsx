import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [category, setCategory] = useState([]);
  const getCategories = async () => {
    const response = await axios.get("/api/product/category");
    if (response.status === 200) {
      setCategory(response.data);
    }
  };


  useEffect(() => {
    getCategories();
  }, []);
  return (
    <nav
      className="col-md-2 d-none d-md-block bg-light sidebar"
      style={{ height: "100vh" }}
    >
      <div className="sidebar-sticky mt-5">
        <h3>Categories</h3>
        <ul className="nav flex-column">
          {category.length > 0 &&
            category.map((c) => (
              <li className="nav-item">
                <a className="nav-link active" href={`/?category=${c.categoryName}`} >
                  {c.categoryName}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
