import React from "react";
import classes from "./NavbarLogin.module.css";
import logo from "src/assets/logo.png";
import { motion } from "framer-motion";
import { logoAnimation } from "../../../services/animate";
import { Link } from "react-router-dom";
import { Row } from "antd";
const NavbarLogin = () => {
  return (
    <motion.div
      variants={logoAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
      className={classes.navbar}
    >
      <Link to="/">
        <img src={logo} className={classes.logo} alt="logo"></img>
      </Link>
    </motion.div>
  );
};
export default NavbarLogin;
