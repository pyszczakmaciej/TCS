import { useState } from "react";
import "./Auth.page.css";
import LoginForm from "./forms/login/LoginForm.component";
import RegisterForm from "./forms/register/RegisterForm.component";

function AuthPage() {
  const [isLoginView, setIsLoginView] = useState<boolean>(true);

  return (
    <>
      <div className="wrapper">
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
