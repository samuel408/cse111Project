import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

const Product = () => {
  const initalValue = {
    name: "",
    description: "",
    categoryId: "",
    quantity: "",
    price: ""
  }

  const [formValue, setFormValue] = useState(initalValue)
  const [product, setProduct] = useState([])
  const [editProductValue, setEditProductValue] = useState({})
  const [edit, setEdit] = useState(false)
  const [category, setCategory] = useState([])
  const getProducts = async () => {
    try {
      const response = await axios.get('/api/product')
      if(response.status === 200) {
        setProduct(response.data)
      }
    }catch(err) {
      console.log(err)
    }
  }

  const changeHandler = (e) => {
    const {name, value} = e.target
    setFormValue({...formValue, [name]: value})
  }

  const getCategory =async () => {
    try {
      const response = await axios.get('/api/product/category')
      if(response.status === 200) {
        setCategory(response.data)
      }
    }catch(err) {
      console.log(err)

    }
  }

  const addProductHandler = async (e)=>{ 
    if(!edit) {
      try {
        const response = await axios.post('/admin/add-product', formValue)
        if(response.status === 200) {
          window.location.reload()
        }
      }catch(err) {
        console.log(err)
      }
    }else {
      try {
        e.preventDefault()
        const response = await axios.put(`/admin/edit-product/${editProductValue.productId}`, formValue);
        if (response.status === 200) {
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  const editProduct = (e, product) => {
    setFormValue(product);
    setEditProductValue(product)
    setEdit(true);
  }

  useEffect(() => {
    getProducts()
    getCategory()
  }, [])
  return (
    <div>
    <Navbar />
    <div className="row">
      <div className="col">
        <div class="table-responsive">
          <table class="table w-50 m-auto border mt-5">
            <caption>List of category</caption>
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {product.length > 0 &&
                product.map((p) => (
                  <tr key={p.productId}>
                    <th scope="row">{p.productId}</th>
                    <th>{p.productname}</th>
                    <th key={p.productId}>
                      <button
                        className="btn btn-danger"
                        onClick={(e) =>
                          editProduct(e, {...p, name: p.productname, description: p.productdescription, quantity: p.quantityOnHand})
                        }
                      >
                        Edit
                      </button>
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col border m-5 p-4">
        <form action="">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="form-control my-2"
              value={formValue.name}
              onChange={changeHandler}
            />
           
          </div>
          <div className="form-group">
            <label htmlFor="name">Product Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="form-control my-2"
              value={formValue.description}
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Category</label>
            <select name="categoryId" className='form-control' value={formValue.categoryId} onChange={changeHandler}>
              {
                category.map((c) => (
                  <option value={c.categoryId}>{c.categoryName}</option>
                ))
              }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Quantity</label>
            <input
              type="text"
              name="quantity"
              placeholder="Quantity"
              className="form-control my-2"
              value={formValue.quantity}
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Price</label>
            <input
              type="text"
              name="price"
              placeholder="Price"
              className="form-control my-2"
              value={formValue.price}
              onChange={changeHandler}
            />
          </div>
          <button className="btn btn-primary" onClick={addProductHandler}>
              {edit === true ? "Edit Product" : "Add Product"}
            </button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Product