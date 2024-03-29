import { Button } from "@mui/material";
import { useState } from "react";
import logo from "../../../../assets/images/logo.png";
import AuthService from "../../../../backend/auth/Auth.service";
import { LoginPayload } from "../../../../backend/auth/models/login-payload.interface";
import Input from "../../../../components/Input/Input.component";
function LoginForm(props: {
  setIsLoginView: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loginFormValues, setLoginFormValues] = useState<LoginPayload>({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginFormValues({
      ...loginFormValues,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    AuthService.login(loginFormValues).then(() => {
      window.location.reload();
    });
  };

  return (
    <form className="form" onSubmit={(e) => login(e)}>
      <img src={logo} style={{ width: "200px", height: "200px" }} />

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
      <Button variant="contained" type="submit">
        Zaloguj
      </Button>
      <Button
        sx={{ color: "var(--color-white)" }}
        onClick={() => props.setIsLoginView(false)}
      >
        Zarejestruj się
      </Button>
    </form>
  );
}

export default LoginForm;
