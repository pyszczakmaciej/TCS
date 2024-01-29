import Hamburger from "hamburger-react";
import { useState } from "react";

import { Button, Typography } from "@mui/material";
import AuthService from "../../backend/auth/Auth.service";
import "./Header.component.css";
import { DesktopNav } from "./components/desktop-nav/DesktopNav.component";
import { MobileNav } from "./components/mobile-nav/MobileNav.component";
export interface HeaderProps {
  username: string;
}

export function Header(props: HeaderProps) {
  const [hamburgerState, setHamburgerState] = useState<boolean>(false);

  const logout = AuthService.logout;

  return (
    <header className="header" {...props}>
      <div className="header-mobile">
        <Hamburger toggled={hamburgerState} toggle={setHamburgerState} />
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "var(--color-success)",
            width: "100%",
            textAlign: "center",
          }}
        >
          Test Craft Studio
        </Typography>{" "}
      </div>
      {hamburgerState ? <MobileNav /> : null}
      <div className="header-desktop">
        <div className="profile">
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "var(--color-success)",
            }}
          >
            Test Craft Studio
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "var(--color-primary)" }}>
            Zalogowano jako: {props.username}
          </Typography>
        </div>
        <DesktopNav />
        <div className="header-desktop__logout-button">
          <Button
            onClick={logout}
            size="small"
            sx={{ width: "50%", color: "var(--color-primary)" }}
          >
            Wyloguj
          </Button>
        </div>
      </div>
    </header>
  );
}
