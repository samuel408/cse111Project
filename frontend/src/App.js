import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/Middleware/RequireAuth";
import Cart from "./pages/Cart";
import Profile from './pages/Profile'
import Shipping from './pages/Shipping'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/cart" exact element={<RequireAuth><Cart /></RequireAuth>} />
          <Route path="/profile" exact element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/shipping" exact element={<RequireAuth><Shipping /></RequireAuth>} />
          <Route path="/signup" exact element={<Register />} />
          <Route path="/signin" exact element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
