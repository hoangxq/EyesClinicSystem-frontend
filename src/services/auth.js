import { AxiosConfig } from "src/configs";
import { failTokens } from "./failTokens";
import sockets from "src/socket";
import axios from "axios";

export function isLoggedIn() {
  return !!localStorage.getItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`);
}

export function getAllowedRoute(routes, role) {
  var allowedData = [];
  routes.forEach((route) => {
    if (route.permission) {
      if (route.permission.includes(role)) {
        allowedData.push(route);
      }
    } else {
      allowedData.push(route);
    }
  });

  return allowedData;
}

export function getAllowedNav(navigation, role) {
  var allowedData = [];
  navigation.forEach((nav) => {
    if (nav.permission) {
      if (nav.permission.includes(role)) {
        if (nav._children) {
          nav._children.forEach((child, index) => {
            if (child.permission && !child.permission.includes(role)) {
              nav._children.splice(index, 1);
            }
          });
        }

        allowedData.push(nav);
      }
    } else {
      if (nav._children) {
        nav._children.forEach((child, index) => {
          if (child.permission && !child.permission.includes(role)) {
            nav._children.splice(index, 1);
          }
        });
      }

      allowedData.push(nav);
    }
  });

  return allowedData;
}

export function storeUserData(data) {
  const user = {
    // avatar: data.avatar,
    // language: data.language,
    username: data.phone,
    role: data.role,
    email: data.email,
    phone: data.phone,
    _id: data._id,
  };

  localStorage.setItem(
    `${process.env.REACT_APP_PREFIX_LOCAL}_user`,
    JSON.stringify(user)
  );
}

export function getToken(callback) {
  axios
    .post(`${process.env.REACT_APP_API}/token/refresh`, {
      refresh_token: localStorage.getItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`
      ),
    })
    .then((res) => {

      localStorage.setItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_access_token`,
        res.data.data.access_token
      );
      callback();
    })
    .catch((err) => {
      if (err.response) {
        if (failTokens().includes(err.response.status)) {
          logOut();
        }
      }
    });
}

export function logOut() {
  localStorage.removeItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`);
  localStorage.removeItem(`${process.env.REACT_APP_PREFIX_LOCAL}_access_token`);
  localStorage.removeItem(
    `${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`
  );
  window.location.href = "/login";
}
