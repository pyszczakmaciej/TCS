import { Button } from "@mui/material";
import { useState } from "react";
import logo from "../../../../assets/images/logo.png";
import AuthService from "../../../../backend/auth/Auth.service";
import { RegisterPayload } from "../../../../backend/auth/models/register-payload.interface";
import Input from "../../../../components/Input/Input.component";

function RegisterForm(props: {
  setIsLoginView: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [registerFormValues, setRegisterFormValues] = useState<RegisterPayload>(
    {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      role: "USER",
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRegisterFormValues({
      ...registerFormValues,
      [e.target.name]: e.target.value,
    });
  };

  const register = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    AuthService.register(registerFormValues).then(() => {
      window.location.reload();
    });
  };

  return (
    <form className="form" onSubmit={(e) => register(e)}>
      <img src={logo} style={{ width: "200px", height: "200px" }} />
      <h3>Rejestracja</h3>
      <div className="inputs">
        <Input
          name="username"
          placeholder="Login"
          onChange={(e) => handleInputChange(e)}
          type="text"
          required
        />
        <Input
          name="password"
          placeholder="Hasło"
          onChange={(e) => handleInputChange(e)}
          type="password"
          required
        />
        <Input
          placeholder="Imię"
          name="firstName"
          onChange={(e) => handleInputChange(e)}
          type="text"
          required
        />
        <Input
          placeholder="Nazwisko"
          name="lastName"
          onChange={(e) => handleInputChange(e)}
          type="text"
          required
        />
        <Input
          placeholder="Adres e-mail"
          name="email"
          onChange={(e) => handleInputChange(e)}
          type="email"
          required
        />
      </div>
      <Button variant="contained" type="submit">
        Załóż konto
      </Button>
      <span onClick={() => props.setIsLoginView(true)}>Wróć do logowania</span>
    </form>
  );
}

export default RegisterForm;
