// src/services/paymentService.js

import { AxiosConfig } from "src/configs";
import { getToken } from "./auth";

export function createMomoPayment(invoiceId, returnUrl, callback) {
    const axiosConfig = AxiosConfig();

    axiosConfig
        .post(`payment/momo-payment/${invoiceId}`, { returnUrl: returnUrl })
        .then((res) => {
            const { payUrl } = res.data;
            // Redirect đến trang thanh toán của Momo
            window.location.href = payUrl;
            // callback(res.data);
        })
        .catch((err) => {
            if (err.response) {
                if (err.response.status === 403) {
                    getToken(() => createMomoPayment(invoiceId, returnUrl, callback));
                } else {
                    callback(err.response.data);
                }
            }
        });
}

export function createCashPayment(invoiceId, callback) {
    const axiosConfig = AxiosConfig();

    axiosConfig
        .post(`invoice/payByCash/${invoiceId}`)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            if (err.response) {
                if (err.response.status === 403) {
                    getToken(() => createCashPayment(invoiceId, callback));
                } else {
                    callback(err.response.data);
                }
            }
        });
}

export function createCashRefund(invoiceId, callback) {
    const axiosConfig = AxiosConfig();

    axiosConfig
        .post(`invoice/refundByCash/${invoiceId}`)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            if (err.response) {
                if (err.response.status === 403) {
                    getToken(() => createCashRefund(invoiceId, callback));
                } else {
                    callback(err.response.data);
                }
            }
        });
}