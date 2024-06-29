import axios from "axios";
import { AxiosConfig } from "src/configs";
import { getToken } from "./auth";

export const createProduct = async (data, callback) => {
    const axios = AxiosConfig();

    axios
        .post(`/product`, data)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            if (err.response) {
                if (err.response.status === 403) {
                    getToken(() => createProduct(data, callback));
                } else {
                    callback(err.response.data);
                }
            }
        });
};
export function getAllProducts(pagination, filter, sorter, callback) {
    const axios = AxiosConfig();
    let api = "";
    if (Object.keys(filter).length === 0) {
        api = `/product`;
    } else {
        api = `/product?page=${pagination.current}&size=${pagination.pageSize}&${filter.filterStr}`;
    }
    axios
        .get(api)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            if (err.response) {
                if (err.response.status === 403) {
                    getToken(() => getAllProducts(pagination, filter, sorter, callback));
                } else {
                    callback(err.response.data);
                }
            }
        });
}
export const updateProductById = async (_id, data, callback) => {
    const axios = AxiosConfig();

    let api = `/product/${_id}`;
    axios
        .put(api, data)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            if (err.response) {
                if (err.response.status === 403) {
                    getToken(() => updateProductById(_id, data, callback));
                } else {
                    callback(err.response.data);
                }
            }
        });
};
