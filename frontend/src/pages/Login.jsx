import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Login = () => {
  const intialValues = {
    email: "",
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
      const rawResponse = await axios.post('/api/auth/signin', formValues)
      if(rawResponse.status === 200) {
        window.location = "/"
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
    if(!values.email) {
      errors.email = "Email is required"
    }else if(!regex.test(values.email)) {
      errors.email = "Email is not in correct format"
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
            <h2 class="card-title text-center mb-5 fw-light">Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div class="form-floating mb-3">
                <input onChange={handleChange} type="email" name="email" value={formValues.email} class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label for="floatingInput">Email address</label>
                <p className='text-danger'>{formErrors.email}</p>
              </div>
              <div class="form-floating mb-4">
                <input onChange={handleChange} type="password" name="password" value={formValues.password} class="form-control" id="floatingPassword" placeholder="Password" />
                <label for="floatingPassword">Password</label>
                <p className='text-danger'>{formErrors.password}</p>
              </div>
              <p>Don't have an account? <Link to="/signup">Register</Link></p>
              <div class="d-grid">
                <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Signin</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login