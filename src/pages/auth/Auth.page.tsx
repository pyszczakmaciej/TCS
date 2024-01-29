import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../backend/auth/Auth.service";
import AppState from "../../store/App.state";
import "./Auth.page.css";
import LoginForm from "./forms/login/LoginForm.component";
import RegisterForm from "./forms/register/RegisterForm.component";

function AuthPage() {
  const [isLoginView, setIsLoginView] = useState<boolean>(true);
  const navigate = useNavigate();
  const user = AppState.getValue("user");
  useEffect(() => {
    if (user) {
      return navigate("/tests");
    } else {
      AuthService.getCurrentUser();
    }
  });

  if (user) return <></>;

  return (
    <>
      <div className="auth-wrapper">
        {isLoginView ? (
          <LoginForm setIsLoginView={setIsLoginView} />
        ) : (
          <RegisterForm setIsLoginView={setIsLoginView} />
        )}
      </div>
    </>
  );
}

export default AuthPage;
