import Hamburger from "hamburger-react";
import { useState } from "react";

import "./Header.component.css";
import { DesktopNav } from "./components/desktop-nav/DesktopNav.component";
import { MobileNav } from "./components/mobile-nav/MobileNav.component";
export interface HeaderProps {
  username: string;
}

function Button(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  return <button className="tsc-btn" {...props}></button>;
}

export function Header(props: HeaderProps) {
  const [hamburgerState, setHamburgerState] = useState<boolean>(false);

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
        <Button>Wyloguj</Button>
      </div>
    </header>
  );
}
