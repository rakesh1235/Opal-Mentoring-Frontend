import { Button, Nav, NavItem } from "reactstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import user1 from "../../assets/images/users/user4.jpg";
import probg from "../../assets/images/bg/download.jpg";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import AlertContext from "../../store/alert-context";

const navigation = [
  
  {
    title: "Content-1",
    href: "/",
    icon: "bi bi-bell",
  },
  {
    title: "Content-2",
    href: "/badges",
    icon: "bi bi-patch-check",
  },
  {
    title: "Content-3",
    href: "/buttons",
    icon: "bi bi-hdd-stack",
  },
  {
    title: "Content-4",
    href: "/table",
    icon: "bi bi-layout-split",
  },
  {
    title: "Content-5",
    href: "/forms",
    icon: "bi bi-textarea-resize",
  },
  {
    title: "Content-6",
    href: "/breadcrumbs",
    icon: "bi bi-link",
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

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  const authCtx = useContext(AuthContext);
  const alertCtx = useContext(AlertContext);
  const history = useHistory();

  const logoutHandler = () => {
    authCtx.logout();
    history.push("/");
    alertCtx.setAlert('success', "Logged Out Successfully")
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
        <div className="bg-dark text-white p-2 opacity-75">{localStorage.getItem('userName')}</div>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link bg-primary text-white py-3 rounded-pill"
                    : "nav-link text-secondary py-3 rounded-pill"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          <hr />
          <Button
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
