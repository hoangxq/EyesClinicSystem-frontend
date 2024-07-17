import axios from "axios";
import { applyMiddleware } from "redux";
import { AxiosConfig } from "src/configs";
import { getToken } from "./auth";

export const getListSchedules = (pagination, filter, sorter, callback) => {
  const axiosConfig = AxiosConfig();
  let api = "";
  if (Object.keys(pagination).length === 0) {
    api = '/schedule'
  }
  if (Object.keys(filter).length === 0) {
    api = `/schedule?page=${pagination.current}&size=${pagination.pageSize}`;
  } else {
    api = `/schedule?page=${pagination.current}&size=${pagination.pageSize}&${filter.filterStr}`;
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
export const getListSchedulesByToday = (pagination, filter, sorter, callback) => {
  const axiosConfig = AxiosConfig();
  let api = "";
  if (Object.keys(pagination).length === 0) {
    api = '/schedule/today'
  }
  if (Object.keys(filter).length === 0) {
    api = `/schedule/today?page=${pagination.current}&size=${pagination.pageSize}`;
  } else {
    api = `/schedule/today?page=${pagination.current}&size=${pagination.pageSize}&${filter.filterStr}`;
  }
  axiosConfig
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => getListSchedulesByToday(pagination, filter, sorter, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
};
export const getListSchedulesOfDoctor = (doctor_id, pagination, filter, sorter, callback) => {
  const axiosConfig = AxiosConfig();
  let api = "";
  if (Object.keys(pagination).length === 0) {
    api = `/schedule/${doctor_id}`
  }
  if (Object.keys(filter).length === 0) {
    api = `/schedule/${doctor_id}?page=${pagination.current}&size=${pagination.pageSize}`;
    // api = `/schedule/${doctor_id}`;
  } else {
    // api = `/schedule?page=${pagination.current}&size=${pagination.pageSize}&${filter.filterStr}`;
    api = `/schedule/${doctor_id}`;
  }
  axiosConfig
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => getListSchedulesOfDoctor(doctor_id, pagination, filter, sorter, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
};

export function getListSchedulesOfUser  (user_id, pagination, filter, sorter, callback) {
  const axiosConfig = AxiosConfig();
  let api = "";
  if (Object.keys(pagination).length === 0) {
    api = `/schedule/user/${user_id}`
  }
  if (Object.keys(filter).length === 0) {
    api = `/schedule/user/${user_id}?page=${pagination.current}&size=${pagination.pageSize}`;
  } else {
    api = `/schedule/user/${user_id}`;
  }
  axiosConfig
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => getListSchedulesOfUser(user_id, pagination, filter, sorter, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
};

export function getScheduleOfPatient(patientId, pagination, filter, sorter, callback) {
  const axiosConfig = AxiosConfig();
  let api = "";
  if (Object.keys(pagination).length === 0) {
    api = `/doctor_schedule/patient/${patientId}`
  }
  if (Object.keys(filter).length === 0) {
    api = `/doctor_schedule/patient/${patientId}?page=${pagination.current}&size=${pagination.pageSize}`;
    // api = `/schedule/${doctor_id}`;
  } else {
    // api = `/schedule?page=${pagination.current}&size=${pagination.pageSize}&${filter.filterStr}`;
    api = `/doctor_schedule/patient/${patientId}`;
  }
  axiosConfig
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => getScheduleOfPatient(patientId, pagination, filter, sorter, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}
export function getScheduleDetail(scheduleId, pagination, filter, sorter, callback) {
  const axiosConfig = AxiosConfig();
  let api = "";
  if (Object.keys(pagination).length === 0) {
    api = `/doctor_schedule/${scheduleId}`
  }
  if (Object.keys(filter).length === 0) {
    api = `/doctor_schedule/${scheduleId}?page=${pagination.current}&size=${pagination.pageSize}`;
    // api = `/schedule/${doctor_id}`;
  } else {
    // api = `/schedule?page=${pagination.current}&size=${pagination.pageSize}&${filter.filterStr}`;
    api = `/doctor_schedule/${scheduleId}`;
  }
  axiosConfig
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => getScheduleDetail(scheduleId, pagination, filter, sorter, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function createSchedule(data, callback) {
  const axios = AxiosConfig();
  axios
    .post(`/schedule`, data)
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

export function createDoctorSchedule(data, callback) {
  const axios = AxiosConfig();
  axios
    .post(`/doctor_schedule`, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => createDoctorSchedule(data, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function createDoctorScheduleByPhoneNumber(id, phone, callback) {
  const axios = AxiosConfig();
  axios
    .post(`/doctor_schedule/register/${id}`,{ phone })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => createDoctorScheduleByPhoneNumber(id, phone, callback));
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

export function cancleDoctorSchedule(schedule_id, callback) {
  const axios = AxiosConfig();

  axios
    .post(`/doctor_schedule/cancle/${schedule_id}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => cancleDoctorSchedule(schedule_id, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function getAllDoctorSchedule(pagination, filter, sorter, callback) {
  const axiosConfig = AxiosConfig();
  let api = "";
  if (Object.keys(pagination).length === 0) {
    api = `/doctor_schedule`
  }
  if (Object.keys(filter).length === 0) {
    api = `/doctor_schedule?page=${pagination.current}&size=${pagination.pageSize}`;
    // api = `/schedule/${doctor_id}`;
  } else {
    // api = `/schedule?page=${pagination.current}&size=${pagination.pageSize}&${filter.filterStr}`;
    api = `/doctor_schedule`;
  }
  axiosConfig
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => getAllDoctorSchedule(pagination, filter, sorter, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}