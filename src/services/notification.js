import { AxiosConfig } from "src/configs";
import { getToken } from "./auth";

export const updateNotifications = (_id, callback) => {
  const axios = AxiosConfig();
  axios
    .put(`${process.env.REACT_APP_API}/notification/seen/${_id}`)
    .then((res) => {
      callback(res.data)
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => updateNotifications(_id, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
};
export const getAllNotification = (callback) => {
  const axios = AxiosConfig();

  axios.get(`/notification`).then(res => {
      callback(res.data);
  }).catch(err => {
      if (err.response) {
          if (err.response.status === 403) {
              getToken(() => createNotification(callback));
          } else {
              callback(err.response.data);
          }
      }
  });
};
export const createNotification = (data, callback) => {
  const axios = AxiosConfig();

  axios.post(`/notification`, data).then(res => {
      callback(res.data);
  }).catch(err => {
      if (err.response) {
          if (err.response.status === 403) {
              getToken(() => createNotification(data, callback));
          } else {
              callback(err.response.data);
          }
      }
  });
};


