import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
const Orders = () => {
    const [orders, setOrders] = useState([])
    const fetchOrders = async () => {
        const response  = await axios.get('/admin/all-orders')
        console.log(response.data)
        setOrders(response.data)
    }
    useEffect(() => {
        fetchOrders()
    }, [])
  return (
    <div>
        <Navbar />
        <div class="table-responsive">
        <table class="table w-50 m-auto border mt-5">
          <caption>List of orders</caption>
          <thead>
            <tr>
                <th scope="col">OrderId</th>
              <th scope="col">CustomerId</th>
              <th scope="col">EmployeeId</th>
              <th scope="col">OrderDate</th>
              <th scope="col">ShippingMethodId</th>
            </tr>
          </thead>
          <tbody>
            {
              orders.length > 0 && (
                orders.map((u) => (
                  <tr>
                  <th scope="row">{u.orderId}</th>
                  <th >{u.customerId}</th>
                  <th >{u.employeeId}</th>
                  <th >{u.orderDate}</th>
                  <th >{u.shippingMethodId}</th>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders