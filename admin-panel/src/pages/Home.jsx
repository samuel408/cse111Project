import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
const Home = () => {
  const [user, setUser] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/admin/users");
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const blockUnblockHandler = async (status, userId) => {
    try {
      const response = await axios.put(`/admin/restrict-account/${userId}`, {status})
      if(response.status === 200) {
        window.location.reload()
      }
    }catch(err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <div>
      <Navbar />
      <div class="table-responsive">
        <table class="table w-50 m-auto border mt-5">
          <caption>List of users</caption>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              user.length > 0 && (
                user.map((u) => (
                  <tr>
                  <th scope="row">{u.customerId}</th>
                  <th >{u.firstName}</th>
                  <th >{u.lastName}</th>
                  <th >{u.emailAddress}</th>
                  <th>
                    {
                      u.isBlocked === "0" ?  <button className="btn btn-danger" onClick={() => blockUnblockHandler("1", u.customerId)}>Block</button>
                      :<button className="btn btn-primary" onClick={() => blockUnblockHandler("0", u.customerId)}>Unblock</button>
                    }
                    
                  </th>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
