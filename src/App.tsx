import type { JSX } from "react";
import "./App.css";
import { jwtDecode } from "jwt-decode";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import IPSelect from "./pages/IPSelect";
import NotFound from "./pages/NotFound";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    if (!exp) return false;

    // Token expiration is in seconds → convert to ms
    return Date.now() < exp * 1000;
  } catch (err) {
    console.error("Error decoding token:", err);
    return false;
  }
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return !isAuthenticated() ? children : <Navigate to="/login" replace />; //TODO: Set up authentication logic
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/404"
          element={<NotFound isAuthenticated={isAuthenticated()} />}
        />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ip-select"
            element={
              <ProtectedRoute>
                <IPSelect />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
