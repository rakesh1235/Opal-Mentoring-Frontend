import React, { useContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import {
  Navbar,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Container,
  NavbarBrand,
  Button,
  Collapse
} from "reactstrap";
import Logo from "./Logo";
import user1 from "../../assets/images/users/user4.jpg";
import { ReactComponent as LogoWhite } from "../../assets/images/logos/materialprowhite.svg";
import Sidebar from "./Sidebar";
import Technologies from "./Leanring";
import About from "./About";
import AuthContext from "../../store/auth-context";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const logoutHandler = () => {
    authCtx.logout();
    history.push("/");
  };

  return (
    <main>
      <Navbar color="primary" dark expand="md" className="fix-header">
        <div className="d-flex align-items-center" style={{ height: 50 }}>
          <div className="d-lg-block d-none me-5 pe-3">
            <Logo />
          </div>
          <NavbarBrand href="/">
            <LogoWhite className=" d-lg-none" />
          </NavbarBrand>
          <Button
            color="primary"
            className=" d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-list"></i>
          </Button>
        </div>
        <div className="hstack gap-2">
          <Button
            color="primary"
            size="sm"
            className="d-sm-block d-md-none"
            onClick={Handletoggle}
          >
            {isOpen ? (
              <i className="bi bi-x"></i>
            ) : (
              <i className="bi bi-three-dots-vertical"></i>
            )}
          </Button>
        </div>

        <Collapse navbar isOpen={isOpen}>
          <div className="position-absolute top-0 end-0 mt-2 me-3">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle color="primary" className="rounded-circle">
                <img
                  src={user1}
                  alt="profile"
                  className="rounded-circle"
                  width="40"
                ></img>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>My Account</DropdownItem>
                <DropdownItem>Edit Profile</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={logoutHandler}>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Collapse>
      </Navbar>
      <div className="pageWrapper d-lg-flex">
        <aside
          className="sidebarArea shadow"
          id="sidebarArea"
          style={{ width: "16%" }}
        >
          <Sidebar />
        </aside>
        <div className="contentArea" style={{ width: "84%" }}>
          <Container className="p-4" fluid>
            <Switch>
              <Route exact path="/">
                <Technologies></Technologies>
              </Route>
              <Route exact path="/about">
                <About></About>
              </Route>
            </Switch>
          </Container>
        </div>
      </div>
    </main>
  );
};

export default Header;
