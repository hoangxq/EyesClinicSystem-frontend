import React, { useEffect } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import { getAllowedNav, getAllowedRoute } from "src/services/auth";
import { Redirect } from "react-router-dom";
import routes from "../routes";
import navigation from "./_nav";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
require("dotenv").config();
const _ = require("lodash");

const TheLayout = (props) => {
  const user = useSelector((state) => state.user);
  let allowedRoutes = [];
  let allowedNav = [];
  let location = useLocation();
  let pathname = location.pathname;

  if (pathname === "/") {
    allowedRoutes = routes.filter(route => route.path === "/");
    allowedNav = getAllowedNav(navigation, user.data.role);; 
  } else if (user && !_.isEmpty(user.data)) {
    allowedRoutes = getAllowedRoute(routes, user.data.role);
    allowedNav = getAllowedNav(navigation, user.data.role);
  } else {
    if (user.message) {
      window.location.href = "/login";
      return <Redirect to={pathname} />;
    } else {
      // return <Redirect from="/" to="login" />
      return <Redirect from="/" to="login" />;
    }
  }

  return (
    <div className="c-app c-default-layout">
      <TheSidebar navigation={allowedNav} />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent routes={allowedRoutes} />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
