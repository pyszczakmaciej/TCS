import { NavigationLinks } from "../navigation-links/NavigationLinks.component";
import "./DesktopNav.component.css";
export interface IDesktopNavProps {}

export function DesktopNav() {
  return (
    <nav className="desktop-nav">
      <NavigationLinks />
    </nav>
  );
}
