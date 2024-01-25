import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/ProtectedRoute.component";
import HomePage from "./pages/Home.page";
import AuthPage from "./pages/auth/Auth.page";

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<PrivateRoute component={HomePage} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
