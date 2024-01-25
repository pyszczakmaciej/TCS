import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../../components/Input/Input.component";
import AuthService, { LoginPayload } from "../../../../services/Auth.service";

function LoginForm(props: {
  setIsLoginView: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loginFormValues, setLoginFormValues] = useState<LoginPayload>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

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

  return (
    <form className="form" onSubmit={(e) => login(e)}>
      <h1>Test Craft Studio</h1>
      <h3>Logowanie</h3>
      <div className="inputs">
        <Input
          placeholder="Login"
          name="username"
          onChange={(e) => handleInputChange(e)}
          type="text"
          required
        />
        <Input
          placeholder="Hasło"
          name="password"
          onChange={(e) => handleInputChange(e)}
          type="password"
          required
        />
      </div>
      <button className="button" type="submit">
        Zaloguj
      </button>
      <span onClick={() => props.setIsLoginView(false)}>Zarejestruj się</span>
    </form>
  );
}

export default LoginForm;
