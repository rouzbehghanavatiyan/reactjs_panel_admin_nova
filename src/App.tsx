import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./utils/axios";
import PrivateLayout from "./layouts/PrivateLayout";
import PrivateRoutes from "./routes/PrivateRoutes";
import Login from "./pages/Login";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const PrivateRoute = ({ children }: { children: any }) => {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated() ? <Login /> : <Navigate to="/home" replace />
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <PrivateRoutes />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
