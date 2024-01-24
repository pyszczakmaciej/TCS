import { useNavigate } from "react-router-dom";
import AuthService from "../services/Auth.service";

function AuthPage() {
  const navigate = useNavigate();

  const login = (): void => {
    AuthService.login().then(() => {
      navigate("/");
    });
  };

  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "16px",
        }}
      >
        <h1>Test Craft Studio</h1>
        <input />
        <input />

        <button type="button" onClick={() => login()}>
          Zaloguj
        </button>
        <span>Zarejestruj się</span>
      </form>
    </>
  );
}

export default AuthPage;
