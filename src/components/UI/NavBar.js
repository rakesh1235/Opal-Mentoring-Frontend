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
  Collapse,
} from "reactstrap";
import Logo from "./Logo";
import user1 from "../../assets/images/users/user4.jpg";
import { ReactComponent as LogoWhite } from "../../assets/images/logos/materialprowhite.svg";
import Sidebar from "./Sidebar";
import Programs from "../home/Programs";
import About from "./About";
import AuthContext from "../../store/auth-context";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Technologies from "../home/Technologies";
import UsersList from "../admin/user/UsersList";
import CreateUser from "../admin/user/CreateUser";

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
      <Navbar color="dark" dark expand="md" className="fix-header">
        <div className="d-flex align-items-center">
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

        <Collapse navbar isOpen={isOpen} style={{height:'30px'}}>
          <div className="position-absolute top-0 end-0 me-3" >
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle color="grey" className="rounded-circle">
                <img
                  src={user1}
                  alt="profile"
                  className="rounded-circle"
                  width="30"
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
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        <div className="contentArea">
          {/* <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Programs
            </Link>
            <Typography color="text.primary">Breadcrumbs</Typography>
          </Breadcrumbs> */}
          <hr />
          <Container className="p-4" fluid>
            <Switch>
              <Route path="/programs">
                <Programs></Programs>
              </Route>
              <Route path="/users">
                <UsersList/>
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
