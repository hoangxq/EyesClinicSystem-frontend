import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
} from "@coreui/react";
import { withNamespaces } from "react-i18next";
import CIcon from "@coreui/icons-react";

// routes config
import routes from "../routes";

import {
  TheHeaderDropdown,
  TheHeaderDropdownLang,
  TheHeaderDropdownNotif,
} from "./index";

const TheHeader = ({ t }) => {
  const storedUser = localStorage.getItem('eyesclinicsystem_user');
  const user = JSON.parse(storedUser);

  const isLoggedIn = user !== null;
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />

      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon
          name="logo"
          height="48"
          alt="Logo"
          src={window.location.origin + "/images/logo.png"}
        />
      </CHeaderBrand>
      {/* 
      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/dashboard"></CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav> */}

      <CHeaderNav className="px-3  ml-auto">
        <TheHeaderDropdownNotif t={t} />
        <TheHeaderDropdownLang />
        {isLoggedIn && (
          <TheHeaderDropdown />
        )}

        {!isLoggedIn && ( // Show login/register links if not logged in
          <>
            <CHeaderNavItem className="px-3">
              <CLink to="/login">{t("Login")}</CLink>
            </CHeaderNavItem>
            <CHeaderNavItem className="px-3">
              <CLink to="/register">{t("Register")}</CLink>
            </CHeaderNavItem>
          </>
        )}
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader>
    </CHeader>
  );
};

export default withNamespaces()(TheHeader);
