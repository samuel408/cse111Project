const connection = require("../config/database");

const getUsers = (req, res, next) => {
  try {
    const findUser = `SELECT * FROM customers`;
    connection.query(findUser, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.status(200).json(result)
      } else {
        next({ status: 400, message: "User with this id not found" });
      }
    });
  } catch (err) {
    next(err);
  }
}

const restrictAccount = (req, res, next) => {
  const userId = req.params.userId;
  const {status} = req.body
  try {
    const findUser = `SELECT * FROM customers WHERE customerId = "${userId}"`;
    connection.query(findUser, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        const updateUserQuery = `UPDATE customers SET isBlocked = '${status}' WHERE customerId = "${userId}"`;
        connection.query(updateUserQuery, (err, result) => {
          if (err) throw err;
          res.status(200).json({ message: "User blocked successfully" });
        });
      } else {
        next({ status: 400, message: "User with this id not found" });
      }
    });
  } catch (err) {
    next(err);
  }
};

const addCategory = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next({ status: 400, message: "Fields are required" });
  }
  try {
    const insertCategoryQuery = `INSERT INTO category(categoryName) VALUES("${name}")`;
    connection.query(insertCategoryQuery, (err, result) => {
      if (err) throw err;
      res.status(200).json({ message: "1 record inserted" });
    });
  } catch (err) {
    next(err);
  }
};

const editCategory = (req, res, next) => {
  const { name } = req.body;
  const id = req.params.id;
  if (!name) {
    return next({ status: 400, message: "Fields are required" });
  }
  try {
    const editCategoryQuery = `UPDATE category SET categoryName = "${name}" WHERE categoryId = "${id}"`;
    connection.query(editCategoryQuery, (err, result) => {
      if (err) throw err;
      res.status(200).json({ message: "1 record updated" });
    });
  } catch (err) {
    next(err);
  }
};

const addProducts = (req, res, next) => {
  const { name, description, categoryId, quantity } = req.body;
  if (!name || !description || !categoryId || !quantity) {
    return next({ status: 400, message: "Fields are required" });
  }
  try {
    const insertProductQuery = `INSERT INTO products(productName, productDescription, categoryId, quantityOnHand) VALUES("${name}", "${description}",  "${categoryId}", "${quantity}")`;
    connection.query(insertProductQuery, (err, result) => {
      if (err) throw err;
      res.status(200).json({ message: "1 record inserted" });
    });
  } catch (err) {
    next(err);
  }
};

const editProduct = (req, res, next) => {
  let { name, description, categoryId, quantity } = req.body;
  const productId = req.params.id;
  try {
    const findProduct = `SELECT * FROM products WHERE productId = "${productId}"`;
    connection.query(findProduct, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        const product = result[0];
        if (!name) {
          name = product.productName;
        }
        if(!description) {
          description = product.productDescription
        }
        if(!categoryId) {
          categoryId = product.categoryId
        }
        if(!quantity) {
          quantity = product.quantityOnHand
        }

        const updateProductQuery = `UPDATE products SET productName = "${name}", productDescription = "${description}", categoryId="${categoryId}", quantityOnHand="${quantity}" WHERE productId = "${productId}"`;
        connection.query(updateProductQuery, (err, result) => {
          if (err) throw err;
          res.status(200).json({ message: "1 record updated" });
        });
      } else {
        next({ status: 404, message: "Product with this id not found" });
      }
    });
  } catch (err) {}
};

const allOrders = (req, res, next) => {
  try {
    const getAllOrders = `SELECT * FROM orders ORDER BY orderId DESC`;
    connection.query(getAllOrders, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length > 0) {
        return res.status(200).json(result);
      } else {
        return res.status(200).json({ message: "No orders available" });
      }
    });
  } catch (err) {
    next(err);
  }
};

const editOrder = (req, res, next) => {
  let { status, date } = req.body;
  if (!status || !date) {
    return next({ status: 400, message: "Status and date field is required" });
  }
  const orderId = req.params.id;
  try {
    const findOrder = `SELECT * FROM orders WHERE orderId = "${orderId}"`;
    connection.query(findOrder, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        const updateOrder = `UPDATE orders SET orderstatus = "${status}", deliveryDate = "${date}" WHERE id = "${orderId}"`;
        connection.query(updateOrder, (err, result) => {
          if (err) throw err;
          res.status(200).json({ message: "1 record updated" });
        });
      } else {
        next({ status: 404, message: "Order not found" });
      }
    });
  } catch (err) {
    next(err);
  }
};

const deleteOrder = (req, res, next) => {
  const id = req.params.id;
  try {
    const getOrder = `SELECT * FROM orders WHERE orderId = "${id}"`;
    connection.query(getOrder, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        const deleteOrder = `DELETE FROM orders WHERE orderId = "${id}"`;
        connection.query(deleteOrder, (err, result) => {
          if (err) throw err;
          res.status(200).json({ message: "1 record updated" });
        });
      } else {
        next({ status: 404, message: "Order not found" });
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  restrictAccount,
  addCategory,
  editCategory,
  addProducts,
  editProduct,
  allOrders,
  editOrder,
  deleteOrder
};
