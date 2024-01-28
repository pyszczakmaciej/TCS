import axios, { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import AppState from "../../store/App.state";
import { AuthResponse } from "./models/auth-response.interface";
import { LoginPayload } from "./models/login-payload.interface";
import { RegisterPayload } from "./models/register-payload.interface";
import { User } from "./models/user.interface";

const apiUrl = `${AppState.getValue("apiUrl")}/auth`;

const getToken = (): string | null => {
  if (!sessionStorage.getItem("at")) return null;
  return String(sessionStorage.getItem("at"));
};

const getCurrentUser = (): User | null => {
  if (!getToken()) return null;
  return jwtDecode(getToken() || "");
};

AppState.setValue("user", getCurrentUser());
AppState.setValue("token", getToken());

const login = async (data: LoginPayload): Promise<void> => {
  await axios
    .post<
      LoginPayload,
      AxiosResponse<AuthResponse, LoginPayload>,
      LoginPayload
    >(`${apiUrl}/authenticate`, data)
    .then((res) => {
      console.log("token data", jwtDecode(res.data.token));
      sessionStorage.setItem("at", res.data.token);
      AppState.setValue("token", res.data.token);
      AppState.setValue("user", jwtDecode(res.data.token));
    })
    .catch((err) => alert("Nie udało się zalogować." + err));
};

const register = async (data: RegisterPayload): Promise<void> => {
  await axios
    .post<
      RegisterPayload,
      AxiosResponse<AuthResponse, RegisterPayload>,
      RegisterPayload
    >(`${apiUrl}/register`, data)
    .then((res) => {
      console.log("token data", jwtDecode(res.data.token));
      sessionStorage.setItem("at", res.data.token);
    })
    .catch((err) => alert("Nie udało się zalogować." + err));
};

const logout = (): void => {
  sessionStorage.removeItem("at");
  window.location.reload();
};

const AuthService = {
  login,
  register,
  logout,
  getCurrentUser,
};

export default AuthService;
