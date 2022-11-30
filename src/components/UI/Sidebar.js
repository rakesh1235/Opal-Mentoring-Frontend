import { Button, Nav, NavItem } from "reactstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import user1 from "../../assets/images/users/user4.jpg";
import probg from "../../assets/images/bg/download.jpg";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import AlertContext from "../../store/alert-context";

const userNavigation = [
  {
    title: "Programs",
    href: "/programs",
    icon: "bi bi-bell",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "bi bi-speedometer2",
  },
  {
    title: "About",
    href: "/about",
    icon: "bi bi-people",
  },
];

const adminNavigation = [
  {
    title: "Users",
    href: "/users",
    icon: "bi bi-bell",
  },
  {
    title: "Mentors",
    href: "/mentors",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Programs",
    href: "/managePrograms",
    icon: "bi bi-people",
  },
  {
    title: "Technologies",
    href: "/manageTechnologies",
    icon: "bi bi-people",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  const authCtx = useContext(AuthContext);
  const alertCtx = useContext(AlertContext);
  const history = useHistory();
  const userRole = localStorage.getItem("userRole");

  const logoutHandler = () => {
    authCtx.logout();
    history.push("/");
    alertCtx.setAlert("success", "Logged Out Successfully");
  };

  return (
    <div>
      <div
        className="profilebg"
        style={{ background: `url(${probg}) no-repeat` }}
      >
        <div className="p-3 d-flex">
          <img src={user1} alt="user" width="50" className="rounded-circle" />
          <Button
            color="white"
            className="ms-auto text-white d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-x"></i>
          </Button>
        </div>
        <div className="bg-dark text-white p-2 opacity-75">
          {localStorage.getItem("userName")}
        </div>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {userRole === "admin"
            ? adminNavigation.map((navi, index) => (
                <NavItem key={index} className="sidenav-bg">
                  <Link
                    to={navi.href}
                    className={
                      location.pathname.startsWith(navi.href)
                        ? "active nav-link py-3"
                        : "nav-link text-secondary py-3"
                    }
                  >
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                  </Link>
                </NavItem>
              ))
            : userNavigation.map((navi, index) => (
                <NavItem key={index} className="sidenav-bg">
                  <Link
                    to={navi.href}
                    className={
                      location.pathname.startsWith(navi.href)
                        ? "active nav-link py-3"
                        : "nav-link text-secondary py-3"
                    }
                  >
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                  </Link>
                </NavItem>
              ))}
          <Button
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
            onClick={logoutHandler}
          >
            Log Out
          </Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
