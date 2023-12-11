import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
const Register = () => {
  const intialValues = {
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    stAddress: "",
    city: "",
    state: "",
    zipcode: "",
    password: ""
  }
  const [formValues, setFormValues] = useState(intialValues)
  const [formErrors, setFormErrors] = useState({})
  const [submit, setIsSubmit] = useState()
  
  const handleChange = (e) => {
    e.preventDefault()
    const { name, value} = e.target
    setFormValues({...formValues, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmit(true)
  }

  const registerUser = async () => {
    try {
      const rawResponse = await axios.post('/api/auth/signup', formValues)
      if(rawResponse.status === 200) {
        alert("User registered successfully")
      }else {
        alert("Something went wrong")
      }
    }catch(err) {
      alert(err.response.data.error.message)
    }
   
  }

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && submit) {
      registerUser()
    } 
  }, [formErrors])

  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    if(!values.firstName) {
      errors.firstName = "First name is required"
    }
    if(!values.lastName) {
      errors.lastName = "Last name is required"
    }
    if(!values.phoneNo) {
      errors.phoneNo = "Phone number is required"
    }
    if(!values.email) {
      errors.email = "Email is required"
    }else if(!regex.test(values.email)) {
      errors.email = "Email is not in correct format"
    }
    if(!values.stAddress) {
      errors.stAddress = "St address is required"
    }
    if(!values.city) {
      errors.city = "City is required"
    }
    if(!values.state) {
      errors.state = "State is required"
    }
    if(!values.zipcode) {
      errors.state = "Zipcode is required"
    }
    if(!values.password) {
      errors.password = "Password is required"
    }
    return errors
  }

  
  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-6 mx-auto">
          <div class="card border rounded-3 my-5">
            <div class="card-body p-4 p-sm-5">
              <h2 class="card-title text-center mb-5 fw-light">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="john"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                  />
                  <label for="floatingInput">First Name</label>
                  <p className="text-danger">{formErrors.firstName}</p>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="doe"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                  />
                  <label for="floatingInput">Last Name</label>
                  <p className="text-danger">{formErrors.lastName}</p>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="doe"
                    name="phoneNo"
                    value={formValues.phoneNo}
                    onChange={handleChange}
                  />
                  <label for="floatingInput">Phone Number</label>
                  <p className="text-danger">{formErrors.phoneNo}</p>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={formValues.email}
                    name="email"
                    onChange={handleChange}
                  />
                  <label for="floatingInput">Email address</label>
                  <p className="text-danger">{formErrors.email}</p>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="123 Main St"
                    name="stAddress"
                    value={formValues.stAddress}
                    onChange={handleChange}
                  />
                  <label for="floatingInput">St Address</label>
                  <p className="text-danger">{formErrors.stAddress}</p>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="ABCD"
                    name="city"
                    value={formValues.city}
                    onChange={handleChange}
                  />
                  <label for="floatingInput">City</label>
                  <p className="text-danger">{formErrors.city}</p>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="ABCD"
                    name="state"
                    value={formValues.state}
                    onChange={handleChange}
                  />
                  <label for="floatingInput">State</label>
                  <p className="text-danger">{formErrors.state}</p>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="ABCD"
                    name="zipcode"
                    value={formValues.zipcode}
                    onChange={handleChange}
                  />
                  <label for="floatingInput">Zipcode</label>
                  <p className="text-danger">{formErrors.zipcode}</p>
                </div>
                <div class="form-floating mb-4">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                  <label for="floatingPassword">Password</label>
                  <p className="text-danger">{formErrors.password}</p>
                </div>
                <p>Already have an account? <Link to="/signin">Login</Link></p>
                <div class="d-grid">
                  <button
                    class="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    Signup
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
