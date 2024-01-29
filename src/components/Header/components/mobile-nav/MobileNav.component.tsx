import { Button } from "@mui/material";
import { motion } from "framer-motion";
import AuthService from "../../../../backend/auth/Auth.service";
import { NavigationLinks } from "../navigation-links/NavigationLinks.component";
import "./MobileNav.component.css";
export interface IMobileNavProps {}

export function MobileNav() {
  const logout = AuthService.logout;

  return (
    <motion.nav
      initial={{ opacity: 0, translateX: "-100%", display: "none" }}
      animate={{ opacity: 1, display: "flex", translateX: "0" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="hamburger-nav"
    >
      <NavigationLinks />
      <Button onClick={logout} sx={{ color: "var(--color-primary)" }}>
        Wyloguj
      </Button>
    </motion.nav>
  );
}
