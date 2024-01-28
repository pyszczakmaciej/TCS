import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header.component";
import AppState from "../../store/App.state";
import "./Root.page.css";

function RootPage() {
  const user = AppState.getValue("user");
  return (
    <div className="app">
      <Header username={user?.sub || ""} />

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default RootPage;
