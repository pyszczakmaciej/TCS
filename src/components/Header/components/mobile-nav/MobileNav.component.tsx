import { motion } from "framer-motion";
import { NavigationLinks } from "../navigation-links/NavigationLinks.component";
import "./MobileNav.component.css";
export interface IMobileNavProps {}

export function MobileNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, translateX: "-100%", display: "none" }}
      animate={{ opacity: 1, display: "flex", translateX: "0" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="hamburger-nav"
    >
      <NavigationLinks />
      <button className="hamburger-logout">Logout</button>
    </motion.nav>
  );
}
