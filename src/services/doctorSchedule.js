import axios from "axios";
import { applyMiddleware } from "redux";
import { AxiosConfig } from "src/configs";
import { getToken } from "./auth";

export const getListSchedules = (pagination, filter, sorter, callback) => {
  const axiosConfig = AxiosConfig();
  let api = "";
  if (Object.keys(pagination).length === 0) {
    api = '/doctor_schedule'
  }
  if (Object.keys(filter).length === 0) {
    api = `/doctor_schedule?page=${pagination.current}&size=${pagination.pageSize}`;
  } else {
    api = `/doctor_schedule?page=${pagination.current}&size=${pagination.pageSize}&${filter.filterStr}`;
  }
  axiosConfig
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => getListSchedules(pagination, filter, sorter, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
};

export function createSchedule(data, callback) {
  const axios = AxiosConfig();
  axios
    .post(`/doctor_schedule`, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => createSchedule(data, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function removeDoctorSchedule(schedule_id, callback) {
  const axios = AxiosConfig();

  axios
    .delete(`/doctor_schedule/${schedule_id}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => removeDoctorSchedule(schedule_id, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}


