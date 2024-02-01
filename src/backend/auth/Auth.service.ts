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

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (!token) return config;
    const { exp } = jwtDecode(token);
    if (!exp) return config;

    const isTokenExpired = Date.now() >= exp * 1000;

    console.log(isTokenExpired);

    if (isTokenExpired) {
      sessionStorage.removeItem("at");
      AppState.setValue("token", null);
      alert("Twoja sesja wygasła, zostaniesz wylogowany.");
      window.location.reload();
      return config;
    }

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

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
