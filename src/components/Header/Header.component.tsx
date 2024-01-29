import Hamburger from "hamburger-react";
import { useState } from "react";

import { Button } from "@mui/material";
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
        <span>{props.username}</span>
      </div>
      {hamburgerState ? <MobileNav /> : null}
      <div className="header-desktop">
        <div className="profile">
          <span>{props.username}</span>
        </div>
        <DesktopNav />
        <div className="header-desktop__logout-button">
          <Button
            onClick={logout}
            size="small"
            sx={{ width: "50%", color: "var(--color-white)" }}
          >
            Wyloguj
          </Button>
        </div>
      </div>
    </header>
  );
}
