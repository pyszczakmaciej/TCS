import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/ProtectedRoute.component";
import AuthPage from "./pages/Auth.page";
import HomePage from "./pages/Home.page";

function App() {
  return (
    <div>
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
