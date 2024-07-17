import { AxiosConfig } from "src/configs";
import { getToken } from "./auth";

export function getListDoctors(pagination, filter, sorter, callback) {
  const axios = AxiosConfig();
  let api = "";
  if (Object.keys(filter).length === 0) {
    // api = `/doctor?page=${pagination.current}&size=${pagination.pageSize}`;
    api = `/doctor`;
  } else {
    api = `/doctor?page=${pagination.current}&size=${pagination.pageSize}&${filter.filterStr}`;
  }
  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => getListDoctors(pagination, filter, sorter, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}
export function createDoctorInfo(data, callback) {
  const axios = AxiosConfig();
  axios
    .post(`/doctor`, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => createDoctorInfo(data, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function getDoctorDetail(doctor_id, callback) {
  const axios = AxiosConfig();
  axios
    .get(`/doctor/${doctor_id}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => getDoctorDetail(doctor_id, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function removeDoctor(doctor_id, callback) {
  const axios = AxiosConfig();

  axios
    .delete(`/doctor_number/${doctor_id}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => removeDoctor(doctor_id, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function updateDoctor(doctor_id, data, callback) {
  const axios = AxiosConfig();

  axios
    .put(`/doctor_number/${doctor_id}`, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => updateDoctor(doctor_id, data, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function getDoctorDetailByUserId(user_id, callback) {
  const axios = AxiosConfig();
  axios
    .get(`/doctor/infor/${user_id}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => getDoctorDetail(user_id, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}