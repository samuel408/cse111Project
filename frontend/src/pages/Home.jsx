import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
const Home = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    let response
    if(category) {
      response = await axios.get(`/api/product?category=${category}`);
    }else {
      response = await axios.get(`/api/product`);
    }
    const data = response.data;
    setProducts(data);
  };

  const addToCart = async (e, productId) => {
    try {
      const response = await axios.post('/api/product/cart', {productId})
      if(response.status === 200) {
        alert("Add to cart")
      }
    }catch(err) {
      console.log(err)

    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container-fluid">
        <div className="row">
          {/* Main Content */}
          <main role="main" className="col-md-10 ml-sm-auto col-lg-10 px-md-4">
            <div className="container my-5">
              <div className="row">
                {products.map((product) => (
                  <div
                    className="col-sm-6 col-md-4 mb-4"
                    key={product.productId}
                  >
                    <div className="card h-100 shadow">
                      <div className="card-body">
                        <h5 className="card-title">{product.productname}</h5>
                        <p className="card-text">
                          <ul className="list-unstyled">
                            <li>
                              <strong>Product ID:</strong> {product.productId}
                            </li>
                            <li>
                              <strong>Description:</strong>{" "}
                              {product.productdescription}
                            </li>
                            <li>
                              <strong>Category:</strong> {product.categoryName}
                            </li>
                            <li>
                              <strong>Quantity In Hand:</strong>{" "}
                              {product.quantityOnHand}
                            </li>
                            <li>
                              <strong>Price:</strong>{" "}
                              {product.price}
                            </li>
                          </ul>
                        </p>
                        <button onClick={(e) => addToCart(e, product.productId)}className="btn btn-primary">
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
