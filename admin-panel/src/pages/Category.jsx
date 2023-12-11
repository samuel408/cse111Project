import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [edit, setEdit] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const getCategory = async () => {
    try {
      const response = await axios.get("/api/product/category");
      setCategory(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const addCategoryHandler = async () => {
    if (!edit) {
      try {
        const response = await axios.post("/admin/add-category", {
          name: categoryName,
        });
        if (response.status === 200) {
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await axios.put(`/admin/edit-category/${categoryId}`, {
          name: categoryName,
        });
        if (response.status === 200) {
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const editCategory = (e, categoryName, categoryId) => {
    setCategoryName(categoryName);
    setCategoryId(categoryId);
    setEdit(true);
  };

  useEffect(() => {
    getCategory();
  }, []);
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
                {category.length > 0 &&
                  category.map((c) => (
                    <tr>
                      <th scope="row">{c.categoryId}</th>
                      <th>{c.categoryName}</th>
                      <th>
                        <button
                          className="btn btn-danger"
                          onClick={(e) =>
                            editCategory(e, c.categoryName, c.categoryId)
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
              <label htmlFor="name">Category Name</label>
              <input
                onChange={(e) => setCategoryName(e.target.value)}
                type="text"
                name="name"
                placeholder="Category Name"
                className="form-control my-2"
                value={categoryName}
              />
              <button className="btn btn-primary" onClick={addCategoryHandler}>
                {edit === true ? "Edit Category" : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Category;
