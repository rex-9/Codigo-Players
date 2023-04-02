import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { getCookie } from "./services/cookie";

const App = () => {
  const token = getCookie("token");
  return (
    <section className="p-0">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              token === undefined ? <Navigate to="/login" replace /> : <Home />
            }
          />
          <Route
            path="/login"
            element={token ? <Navigate to="/" replace /> : <Login />}
          />
        </Routes>
      </Router>
    </section>
  );
};

export default App;
