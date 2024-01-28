import { useState } from "react";
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
      role: "ADMIN",
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRegisterFormValues({
      ...registerFormValues,
      [e.target.name]: e.target.value,
    });
    console.log(registerFormValues);
  };

  const register = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(registerFormValues);
    AuthService.register(registerFormValues).then((res) => {
      console.log(res);
      window.location.reload();
    });
  };

  return (
    <form className="form" onSubmit={(e) => register(e)}>
      <h1>Test Craft Studio</h1>
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
      <button className="button" type="submit">
        Załóż konto
      </button>
      <span onClick={() => props.setIsLoginView(true)}>Wróć do logowania</span>
    </form>
  );
}

export default RegisterForm;
