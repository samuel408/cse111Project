import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cartId, setCartId] = useState()

  const fetchProducts = async () => {
    const response = await axios.get(`/api/product/cart`);
    const data = response.data;
    setProducts(data);
  };

  const handleBuyClick = (cartId) => {
    setShowModal(true);
    setCartId(cartId)
  };

  const handleCloseModal = async (e) => {
    setShowModal(false);
    try {
      const response = await axios.delete(`/api/product/cart/${cartId}`)
      if(response.status === 200) {
        alert("Payment done successfully")
        window.location.reload()
      }
    }catch(err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  if (showModal) {
    return (
      <div>
      <Navbar />
      <form action="">
        <div className="modal-body w-50 m-auto mt-5 border p-4">
          {/* Add your payment fields here */}
          <div className="form-group my-3">
            <input
              type="text"
              placeholder="Card Number"
              className="form-control"
            />
          </div>
          <div className="form-group my-3">
            <input
              type="text"
              placeholder="Expiration Date"
              className="form-control"
            />
          </div>
          <div className="form-group my-3">
            <input type="text" placeholder="CVV" className="form-control" />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCloseModal}
          >
            Pay
          </button>
        </div>
      </form>
      </div>
    );
  }

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
                  <div className="col-sm-6 col-md-4 mb-4" key={product.cartId}>
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
                              <strong>Price:</strong> {product.price}
                            </li>
                          </ul>
                        </p>
                        <button
                          className="btn btn-primary"
                          onClick={(e) => handleBuyClick(product.cartId)}
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Cart;
