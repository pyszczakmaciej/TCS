import axios from "axios";

const apiUrl = "http://localhost:3000";

const getCurrentUser = (): string => {
  return localStorage.getItem("user") || "";
};

const login = async (): Promise<void> => {
  await axios
    .post(`${apiUrl}/login`, {
      email: "test123@test.com",
      password: "test123",
    })
    .then((res) => {
      console.log(res);

      localStorage.setItem("user", "asd");
    })
    .catch((err) => console.log(err));
};

const logout = (): void => {
  localStorage.removeItem("user");
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
