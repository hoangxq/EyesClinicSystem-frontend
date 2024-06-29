import axios from "axios";
import { AxiosConfig } from "src/configs";
import { getToken } from "./auth";

export function register(data, callback) {
  axios
    .post(`${process.env.REACT_APP_API}/user`, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        callback(err.response.data);
      }
    });
}

export function getProfile(id, callback) {
  const axiosConfig = AxiosConfig();

  axiosConfig
    .get(`/user/get/info`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => getProfile(id, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}
export function getListUsers(pagination, filter, sorter, callback) {
  const axios = AxiosConfig();
  let api = "";
  if (Object.keys(filter).length === 0) {
    // api = `/user?page=${pagination.current}&size=${pagination.pageSize}`;
    api = `/user`;
  } else {
    api = `/user?page=${pagination.current}&size=${pagination.pageSize}&${filter.filterStr}`;
  }
  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => getListUsers(pagination, filter, sorter, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}
export function getUserDetails(user_id, callback) {
  const axios = AxiosConfig();

  axios
    .get(`/user/detail/${user_id}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => getUserDetails(user_id, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}
// export function updateUser(user_id, data, callback) {
//     const axios = AxiosConfig();

//     axios.put(`/user/detail/${user_id}`, data).then(res => {
//         callback(res.data);
//     }).catch(err => {
//         if (err.response) {
//             if (err.response.status === 403) {
//                 getToken(updateUser(user_id, data, callback));
//             } else {
//                 callback(err.response.data);
//             }
//         }
//     });
// }
export function updateUserPassword(user_id, data, callback) {
  const axios = AxiosConfig();

  axios
    .put(`/user/update_password/${user_id}`, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => updateUserPassword(user_id, data, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}
export function blockUser(user_id, callback) {
  const axios = AxiosConfig();

  axios
    .put(`/user/block/${user_id}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => blockUser(user_id, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}
export function unblockUser(user_id, callback) {
  const axios = AxiosConfig();

  axios
    .put(`/user/unblock/${user_id}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => blockUser(user_id, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}
export function generateCode(callback) {
  const axiosConfig = AxiosConfig();

  axiosConfig
    .post(`/users/promo_code`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => generateCode(callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function createUser(data, callback) {
  const axios = AxiosConfig();

  axios
    .post(`/user`, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => createUser(data, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function loginUser(data, callback) {
  const axios = AxiosConfig();

  axios
    .post(`${process.env.REACT_APP_API}/auth-user/login`, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        callback(err.response.data);
      }
    });
}
