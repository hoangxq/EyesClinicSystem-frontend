import axios from "axios";
import { AxiosConfig } from "src/configs";
import { getToken } from "./auth";

export function createHistory(data, callback) {
    const axios = AxiosConfig();
  
    axios
      .post(`/history`, data)
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 403) {
            getToken(() => createHistory(data, callback));
          } else {
            callback(err.response.data);
          }
        }
      });
  }

  export function updateHistory(data, callback) {
    const axios = AxiosConfig();
  
    axios
      .put(`/history`, data)
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 403) {
            getToken(() => updateHistory(data, callback));
          } else {
            callback(err.response.data);
          }
        }
      });
  }
  
  export function getHistory(doctorScheduleId, callback) {
    const axios = AxiosConfig();
  
    axios
      .get(`/history/${doctorScheduleId}`)
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 403) {
            getToken(() => getHistory(doctorScheduleId, callback));
          } else {
            callback(err.response.data);
          }
        }
      });
  }

