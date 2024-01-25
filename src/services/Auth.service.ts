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
  return localStorage.getItem("user") || "";
};

const login = async (data: LoginPayload): Promise<void> => {
  await axios
    .post<
      LoginPayload,
      AxiosResponse<LoginResponse, LoginPayload>,
      LoginPayload
    >(`${apiUrl}/auth/authenticate`, {
      username: data.username,
      password: data.password,
    })
    .then((res) => {
      console.log(jwtDecode(res.data.token));
      localStorage.setItem("user", res.data.token);
    })
    .catch((err) => alert("Nie udało się zalogować." + err));
};

const register = async (): Promise<void> => {
  await axios
    .post<
      RegisterPayload,
      AxiosResponse<LoginResponse, RegisterPayload>,
      RegisterPayload
    >(`${apiUrl}/auth/register`, {
      username: "test123",
      password: "test123",
      email: "test123@test.com",
      firstName: "Testowy",
      lastName: "User",
      role: "USER",
    })
    .then((res) => {
      console.log(jwtDecode(res.data.token));
      localStorage.setItem("user", res.data.token);
    })
    .catch((err) => alert("Nie udało się zalogować." + err));
};

const logout = (): void => {
  localStorage.removeItem("user");
};

const AuthService = {
  login,
  register,
  logout,
  getCurrentUser,
};

export default AuthService;
