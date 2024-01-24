import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthService from "../services/Auth.service";

// function ProtectedRoute(props: { user: boolean }) {
//   const [user, setUser] = useState(false);

//   useEffect(() => {
//     if (props.user) {
//       setUser(props.user);
//     }
//   }, [props.user]);

//   return user ? (
//     <div>
//       <h1>Protected routes</h1>
//       <Outlet />
//     </div>
//   ) : (
//     <Navigate to="/auth" />
//   );
// }

// export default ProtectedRoute;

const PrivateRoute = (props: { component: React.ComponentType }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Your authentication logic goes here...

  useEffect(() => {
    const user = Boolean(AuthService.getCurrentUser());

    if (user) {
      setIsAuthenticated(true);
      navigate("/");
    }
  }, []);

  return isAuthenticated ? <props.component /> : <Navigate to="/auth" />;
};
export default PrivateRoute;
