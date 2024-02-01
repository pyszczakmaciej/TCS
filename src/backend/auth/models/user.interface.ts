export interface User {
  uuid: string;
  sub: string;
  iat: number;
  exp: number;
  role: "USER" | "ADMIN";
}
