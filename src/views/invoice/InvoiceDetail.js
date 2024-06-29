import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { Button, Descriptions, notification } from "antd";
import { getProfile } from "src/services/user";
import { useSelector } from "react-redux";
import { withNamespaces } from "react-i18next";
import moment from "moment";
import { getInvoiceDetail } from "src/services/invoice";
import { createMomoPayment } from "src/services/payment";
import "src/scss/invoiceDetail.scss";


const InvoiceDetail = ({ match, t }) => {
    const [data, setData] = useState();
    const storedUser = localStorage.getItem('eyesclinicsystem_user');
    const user = JSON.parse(storedUser);
    const userId = user._id;
    const userRole = user.role;
    useEffect(() => {
        getInvoiceDetail(match.params._id, (res) => {
            console.log(match.params._id);
            if (res.status === 1) {
                setData(res.data.data);
            } else {
                notification.error({
                    message: t(`Notification`),
                    description: `${res.message}`,
                    placement: `bottomRight`,
                    duration: 1.5,
                });
            }
        });
    }, [match.params._id, t]);

    const renderStatus = (status) => {
        if (status === 0) {
            return "Chưa thanh toán";
        } else if (status === 1) {
            return "Đã thanh toán";
        } else if (status === 2) {
            return "Đã hoàn";
        } else if (status === 3) {
            return "Thanh toán thất bại";
        } else {
            return "Trạng thái không xác định"; // Xử lý trường hợp khác (nếu có)
        }
    };

    const getStatusClass = (status) => {
        if (status === 0) {
            return "unpaid-status";
        } else if (status === 1) {
            return "paid-status";
        } else if (status === 2) {
            return "refunded-status";
        } else if (status === 3) {
            return "failed-status";
        } else {
            return "";
        }
    };

    const handlePayment = () => {
        const returnUrl = window.location.href;

        // Gọi service để khởi tạo thanh toán và xử lý phản hồi
        createMomoPayment(match.params._id, returnUrl, (res) => {
            if (res.status === "success") {
                window.location.href = res.data.paymentUrl; // Chuyển hướng đến URL thanh toán
            } else {
                notification.error({
                    message: "Lỗi thanh toán",
                    description: res.message,
                    placement: "bottomRight",
                });
            }
        });
    };

    return (
        <>
            <CRow className="justify-content-center">
                <CCol xs="12" sm="6">
                    <CCard>
                        <CCardBody>
                            {data ? (
                                <Descriptions
                                    title={t("Chi tiết hóa đơn")}
                                    bordered
                                    className={getStatusClass(data.invoice.status)}
                                >
                                    <Descriptions.Item label={t("Bệnh nhân")} span={3}>
                                        {`${data.invoice.user_name} - SĐT: ${data.invoice.user_phone}`}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={t("Nội dung")} span={3}>
                                        {data.invoice.content}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={t("Tổng tiền ")} span={3}>
                                        {data.invoice.amount}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={t("Trạng thái")} span={3}>
                                        {renderStatus(data.invoice.status)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={t("Sản phẩm")} span={3}>
                                        <ul>
                                            {data.products.map((product) => (
                                                <li key={product._id}>
                                                    {`${product.name} - Số lượng: ${product.quantity} - Giá tiền: ${product.price}`}
                                                </li>
                                            ))}
                                        </ul>
                                    </Descriptions.Item>
                                    <Descriptions.Item label={t("Tạo vào ngày")} span={3}>
                                        {moment(data.invoice.created_at).format("HH:mm DD-MM-YYYY")}
                                    </Descriptions.Item>
                                    {(data.invoice.status === 0 || data.invoice.status === 3) && (
                                        <Descriptions.Item span={3}>
                                            <Button onClick={handlePayment} type="primary">
                                                {t("Thanh toán")}
                                            </Button>
                                            {userRole === "ADMIN" && (
                                                <Button onClick={handlePayment} type="default" style={{ marginLeft: '10px' }}>
                                                    {t("Thanh toán bằng tiền mặt")}
                                                </Button>
                                            )}
                                        </Descriptions.Item>
                                    )}
                                </Descriptions>
                            ) : null}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};

export default withNamespaces()(InvoiceDetail);