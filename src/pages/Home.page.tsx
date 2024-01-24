import { useNavigate } from "react-router-dom";
import AuthService from "../services/Auth.service";

function HomePage() {
  const navigate = useNavigate();

  const logout = (): void => {
    AuthService.logout();
    navigate("/auth");
  };

  return (
    <>
      <div>
        <h1>Home page</h1>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </>
  );
}

export default HomePage;
