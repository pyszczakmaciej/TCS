import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input.component";
import AuthService from "../../services/Auth.service";
import "./Auth.page.css";

interface LoginFormValues {
  username: string;
  password: string;
}

function AuthPage() {
  const navigate = useNavigate();

  const [loginFormValues, setLoginFormValues] = useState<LoginFormValues>({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginFormValues({
      ...loginFormValues,
      [e.target.name]: e.target.value,
    });
    console.log(loginFormValues);
  };

  const login = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(loginFormValues);
    AuthService.login(loginFormValues).then(() => {
      navigate("/");
    });
  };

  const register = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
    e.preventDefault();
    console.log(loginFormValues);
    AuthService.register().then(() => {
      navigate("/");
    });
  };

  return (
    <>
      <div className="wrapper">
        <form className="form" onSubmit={(e) => login(e)}>
          <h1>Test Craft Studio</h1>
          <div className="inputs">
            <Input
              name="username"
              onChange={(e) => handleInputChange(e)}
              type="text"
              required
            />
            <Input
              name="password"
              onChange={(e) => handleInputChange(e)}
              type="password"
              required
            />
          </div>
          <button className="button" type="submit">
            Zaloguj
          </button>
          <span onClick={(e) => register(e)}>Zarejestruj się</span>
        </form>
      </div>
    </>
  );
}

export default AuthPage;
