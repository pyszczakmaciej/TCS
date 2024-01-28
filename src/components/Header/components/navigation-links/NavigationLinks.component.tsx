import { NavLink } from "react-router-dom";
import "./NavigationLinks.component.css";
import { navigationRoutes } from "./constants/navigation-routes.constants";

export interface INavigationLinksProps {}

export function NavigationLinks() {
  return (
    <>
      {navigationRoutes.map((route, i) => (
        <NavLink
          className={({ isActive }) => (isActive ? "link--active" : "link")}
          key={i}
          to={route.path}
        >
          {route.label}
        </NavLink>
      ))}
    </>
  );
}
