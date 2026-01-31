import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./utils/axios";
import PrivateLayout from "./layouts/PrivateLayout";
import PrivateRoutes from "./routes/PrivateRoutes";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <PrivateLayout>
                <PrivateRoutes />
              </PrivateLayout>
            }
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
