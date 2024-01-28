import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/auth/Auth.page";
import { EditTestPage } from "./pages/edit-test/EditTest.page";
import RootPage from "./pages/root/Root.page";
import { TestsPage } from "./pages/tests/Tests.page";
import AppState from "./store/App.state";

function App() {
  const user = AppState.getValue("user");
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          {user ? (
            <Route path="/" element={<RootPage />}>
              <Route path="/tests">
                <Route path="" element={<TestsPage />} />
                <Route path=":testId" element={<EditTestPage />} />
              </Route>
              {/* <Route path="/tests" element={<TestsPage />}>
                <Route path=":testId" element={<EditTestPage />} />
              </Route> */}
            </Route>
          ) : (
            <Route path="/*" element={<Navigate to="/auth" />} />
          )}
        </Routes>
        {/* <Routes>
          <Route path="/" element={<Navigate to="/tests" />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/tests">
            <Route
              index={true}
              element={<PrivateRoute component={TestsPage} />}
            />
            <Route
              index={false}
              path=":testId"
              element={<PrivateRoute component={EditTestPage} />}
            />
          </Route>
        </Routes> */}
      </Router>
    </div>
  );
}

export default App;
