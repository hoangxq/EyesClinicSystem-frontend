import axios from "axios";
import { AxiosConfig } from "src/configs";
import { getToken } from "./auth";

// export function register(data, callback) {
//   axios
//     .post(`${process.env.REACT_APP_API}/api/users/register`, data)
//     .then((res) => {
//       callback(res.data);
//     })
//     .catch((err) => {
//       if (err.response) {
//         callback(err.response.data);
//       }
//     });
// }

export function getInvoiceDetail(_id, callback) {
  const axiosConfig = AxiosConfig();

  axiosConfig
    .get(`/invoice/detail/${_id}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => getInvoiceDetail(_id, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}
export function getListInvoice(pagination, filter, sorter, callback) {
  const axios = AxiosConfig();
  let api = "";
  if (Object.keys(filter).length === 0) {
    // api = `/user?page=${pagination.current}&size=${pagination.pageSize}`;
    api = `/invoice`;
  } else {
    api = `/invoice?page=${pagination.current}&size=${pagination.pageSize}&${filter.filterStr}`;
  }
  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => getListInvoice(pagination, filter, sorter, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function createInvoice(invoiceData, callback) {
  const axios = AxiosConfig(); 

  axios
    .post('/product_invoice/createMultiple', invoiceData)
    .then((res) => {
      callback(res.data); 
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          
        } else {
          callback(err.response.data); 
        }
      } else {
       
        console.error('Error:', err.message);
        callback({ status: 'error', message: 'Network error or server unreachable.' });
      }
    });
}

export function removeInvoice(invoice_id, callback) {
  const axios = AxiosConfig();

  axios
    .post(`/invoice/deleteInvoice/${invoice_id}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => removeInvoice(invoice_id, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}




