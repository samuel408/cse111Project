import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequireAuth from './components/Middleware/RequireAuth'
import Login from './pages/Login';
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Orders from './pages/Orders';
function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/" exact element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/signin" exact element={<Login />} />
          <Route path="/category" exact element={<RequireAuth><Category /></RequireAuth>} />
          <Route path="/product" exact element={<RequireAuth><Product /></RequireAuth>} />
          <Route path="/orders" exact element={<RequireAuth><Orders /></RequireAuth>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
