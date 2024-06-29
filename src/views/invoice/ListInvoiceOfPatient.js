import React, { useEffect, useState } from "react";
import moment from "moment";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import {
    Table,
    Tag,
    Space,
    notification,
    Avatar,
    Button,
    Modal
} from "antd";
import {
    ExclamationCircleOutlined,
    UploadOutlined,
    PlusSquareOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";
import { Notification, Roles, Status, Type } from "src/configs";
import { Link } from "react-router-dom";
// import moment from 'moment';
// import { useSelector } from 'react-redux';
import { numberWithCommas } from "src/services/money";
import { withNamespaces } from "react-i18next";
import { pagination as pag } from "src/configs/Pagination";
import { getAllDoctorSchedule, removeDoctorSchedule } from "src/services/schedule";
import { getListInvoice, removeInvoice } from "src/services/invoice";
const ListInvoice = ({ match, t }) => {
    const [pagination, setPagination] = useState(pag);
    const [data, setData] = useState();
    const history = useHistory();
    const columns = [
        {
            title: t("ID"),
            dataIndex: "key",
        },
        {
            title: t("Content"),
            dataIndex: "content",
        },
        {
            title: t("Amount"),
            dataIndex: "amount",
        },
        {
            title: t("Date"),
            dataIndex: "create_at",
            defaultSortOrder: 'descend',
            sorter: (a, b) => moment(a.date) - moment(b.date),
            render: (date) => moment(date).format("DD-MM-YYYY"),
        },
        {
            title: t("Status"),
            dataIndex: "status",
            render: (status) => {
                let color, name;
                switch (status) {
                    case 0:
                        color = "gold";
                        name = "Chưa thanh toán";
                        break;
                    case 1:
                        color = "green";
                        name = "Đã thanh toán";
                        break;
                    case 2:
                        color = "red";
                        name = "Đã hoàn";
                        break;
                    case 3:
                        color = "orange";
                        name = "Thanh toán không thành công";
                        break;
                    default:
                        color = "default-color"; // Màu mặc định nếu không có trạng thái nào phù hợp
                        name = "Unknown"; // Giá trị mặc định nếu không có trạng thái nào phù hợp
                        break;
                }

                return (
                    <>
                        <Tag color={color} key={name}>
                            {name.toUpperCase()}
                        </Tag>
                    </>
                );
            },
        },
        {
            title: t("Action"),
            dataIndex: "_id",
            render: (_id) => {
                return (
                    <>
                        <Space size="middle">
                            <Link to={`/invoice/${_id}`}>{t("Xem chi tiết")}</Link>
                        </Space>

                    </>
                );
            },
        },

        {
            title: t(""),
            dataIndex: "_id",
            render: (_id) => {
                return (
                    <>
                        <Space size="middle">
                            {/* <Link to={`/schedules/${_id}`}>{t("Register")}</Link> */}
                            <Button onClick={() => handleDeleteClick(_id)}>{t("Delete")}</Button>
                        </Space>
                    </>
                );
            },
        },

    ];
    const handleDeleteClick = (id) => {
        Modal.confirm({
            title: t(`Xóa hóa đơn`),
            icon: <ExclamationCircleOutlined />,
            content: t(
                `You are going to delete this invoice? Are you sure you want to do this? You can't reverse this`
            ),
            onOk() {
                removeInvoice(id, (res) => {
                    if (res.status === 1) {
                        notification.success({
                            message: t(`Notification`),
                            description: `delete invoice successful.`,
                            placement: `bottomRight`,
                            duration: 1.5,
                        });
                        // setIsFinalUpdate(true)
                        // history.push(`/schedules/patient`);
                        window.location.reload()
                    } else {
                        notification.error({
                            message: t(`Notification`),
                            description: `delete invoice failed.`,
                            placement: `bottomRight`,
                            duration: 1.5,
                        });
                    }
                });
            },
            onCancel() {
                notification.info({
                    message: t(`Notification`),
                    description: t(`Stop delete schedule of patient`),
                    placement: `bottomRight`,
                    duration: 1.5,
                });
            },
            centered: true,
        });
    }
    const handleTableChange = (pagination, filters, sorter) => {
        let key = pagination.pageSize * (pagination.current - 1) + 1;
        const storedUser = localStorage.getItem('eyesclinicsystem_user');
        const user = JSON.parse(storedUser);
        const id = user._id;
        getListInvoice(pagination, {}, {}, (res) => {
            console.log('nnqa')
            if (res.status === 1) {
                res.data.invoice_list.forEach((invoice) => {
                    invoice.key = key++;
                });

                setData(res.data.invoice_list);
                console.log(data)
                setPagination({ ...pagination, total: res.data.meta_data.total })

            } else if (res.status === 403) {
                notification.error({
                    message: t(`Notification`),
                    description: `${res.message + " " + res.expiredAt}`,
                    placement: `bottomRight`,
                    duration: 10,
                });
            } else {
                notification.error({
                    message: t(`Notification`),
                    description: `${res.message}`,
                    placement: `bottomRight`,
                    duration: 1.5,
                });
            }
        }, []);
    };

    useEffect(() => {
        console.log(123)
        getListInvoice(pagination, {}, {}, (res) => {
            console.log(123)
            if (res.status === 1) {
                let key = 1;
                res.data.invoice_list.forEach((invoice) => {
                    invoice.key = key++;
                });
                setData(res.data.invoice_list);
                console.log(res)
                setPagination({ ...pagination, total: res.meta_data.total });
            } else if (res.status === 403) {
                notification.error({
                    message: t(`Notification`),
                    description: `${res.message + " " + res.expiredAt}`,
                    placement: `bottomRight`,
                    duration: 10,
                });
            } else {
                notification.error({
                    message: t(`Notification`),
                    description: `${res.message}`,
                    placement: `bottomRight`,
                    duration: 1.5,
                });
            }
        });
    }, []);
    return (
        <CRow className="position-relative">
            <CCol xs="12" md="12" className="mb-4 position-absolute">
                <CCard>
                    <CCardHeader>{t("List Invoice of Patient")}</CCardHeader>
                    <CCardBody>
                        <Table
                            className="overflow-auto"
                            columns={columns}
                            dataSource={data}
                            pagination={pagination}
                            onChange={handleTableChange}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default withNamespaces()(ListInvoice)