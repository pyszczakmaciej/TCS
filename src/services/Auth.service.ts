import axios, { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "USER" | "ADMIN";
}

export interface LoginResponse {
  token: string;
}

const apiUrl = "http://localhost:8080";

const getCurrentUser = (): string => {
  return sessionStorage.getItem("at") || "";
};

const login = async (data: LoginPayload): Promise<void> => {
  await axios
    .post<
      LoginPayload,
      AxiosResponse<LoginResponse, LoginPayload>,
      LoginPayload
    >(`${apiUrl}/auth/authenticate`, data)
    .then((res) => {
      console.log("token data", jwtDecode(res.data.token));
      sessionStorage.setItem("at", res.data.token);
    })
    .catch((err) => alert("Nie udało się zalogować." + err));
};

const register = async (data: RegisterPayload): Promise<void> => {
  await axios
    .post<
      RegisterPayload,
      AxiosResponse<LoginResponse, RegisterPayload>,
      RegisterPayload
    >(`${apiUrl}/auth/register`, data)
    .then((res) => {
      console.log("token data", jwtDecode(res.data.token));
      sessionStorage.setItem("at", res.data.token);
    })
    .catch((err) => alert("Nie udało się zalogować." + err));
};

const logout = (): void => {
  sessionStorage.removeItem("at");
};

const AuthService = {
  login,
  register,
  logout,
  getCurrentUser,
};

export default AuthService;
