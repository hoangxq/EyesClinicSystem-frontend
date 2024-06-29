import React, { useEffect, useState } from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { Table, Space, notification, Button, Modal, Form, Input, InputNumber } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { withNamespaces } from "react-i18next";
import { getAllProducts, updateProductById } from "src/services/product";
import { pagination as pag } from "src/configs/Pagination";
import UpLoadImage from 'src/containers/UpLoadImage';

const ListProduct = ({ t }) => {
    const [pagination, setPagination] = useState(pag);
    const [data, setData] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [form] = Form.useForm();

    const columns = [
        {
            title: t("ID"),
            dataIndex: "key",
        },
        {
            title: t("Name"),
            dataIndex: "name",
        },
        {
            title: t("Code"),
            dataIndex: "code",
        },
        {
            title: t("Type"),
            dataIndex: "type",
        },
        {
            title: t("Price"),
            dataIndex: "price",
        },
        {
            title: t("Quantity"),
            dataIndex: "quantity",
        },
        {
            title: t("Image"),
            dataIndex: "photo",
            render: (photo) => <img src={photo} alt="Product" style={{ width: 50 }} />,
        },
        {
            title: t("Action"),
            dataIndex: "_id",
            render: (_id, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEditClick(record)}>{t("Chỉnh sửa")}</Button>
                </Space>
            ),
        },
    ];

    const handleEditClick = (product) => {
        setEditingProduct(product);
        form.setFieldsValue(product);
        setImageUrl(product.photo);
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            console.log('hello', values)
            if (imageUrl) {
                values.photo = imageUrl;
            }
            console.log('hello', values)
            updateProductById(editingProduct._id, values, handleUpdateResponse);
        }).catch((info) => {
            console.log("Validate Failed:", info);
        });
    };

    const handleUpdateResponse = (res) => {
        if (res.status === 1) {
            notification.success({
                message: t(`Thông báo`),
                description: t(`Cập nhật sản phẩm thành công.`),
                placement: `bottomRight`,
                duration: 1.5,
            });
            setIsModalVisible(false);
            window.location.reload();
        } else {
            notification.error({
                message: t(`Thông báo`),
                description: t(`Cập nhật sản phẩm thất bại.`),
                placement: `bottomRight`,
                duration: 1.5,
            });
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleFileChange = (url) => {
        setImageUrl(url);
    };

    const handleTableChange = (pagination, filters, sorter) => {
        getAllProducts(pagination, filters, sorter, (res) => {
            if (res.status === 1) {
                let key = (pagination.current - 1) * pagination.pageSize + 1;
                const updatedData = res.data.product_list.map((product) => ({
                    ...product,
                    key: key++,
                }));
                setData(updatedData);
                setPagination({ ...pagination, total: res.data.meta_data.total });
            } else {
                notification.error({
                    message: t(`Thông báo`),
                    description: `${res.message}`,
                    placement: `bottomRight`,
                    duration: 1.5,
                });
            }
        });
    };

    useEffect(() => {
        getAllProducts(pagination, {}, {}, (res) => {
            if (res.status === 1) {
                let key = 1;
                const updatedData = res.data.product_list.map((product) => ({
                    ...product,
                    key: key++,
                }));
                setData(updatedData);
                setPagination({ ...pagination, total: res.data.meta_data.total });
            } else {
                notification.error({
                    message: t(`Thông báo`),
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
                    <CCardHeader>{t("Danh sách sản phẩm")}</CCardHeader>
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

            <Modal
                title={t("Chỉnh sửa sản phẩm")}
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                centered
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label={t("Tên sản phẩm")}
                        rules={[{ required: true, message: t("Tên sản phẩm là bắt buộc.") }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        label={t("Mã sản phẩm")}
                        rules={[{ required: true, message: t("Mã sản phẩm là bắt buộc.") }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="type"
                        label={t("Loại sản phẩm")}
                        rules={[{ required: true, message: t("Loại sản phẩm là bắt buộc.") }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label={t("Giá sản phẩm")}
                        rules={[{ required: true, message: t("Giá sản phẩm là bắt buộc.") }]}
                    >
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name="quantity"
                        label={t("Số lượng")}
                        rules={[{ required: true, message: t("Số lượng là bắt buộc.") }]}
                    >
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item name="photo" label={t("Ảnh sản phẩm")}>
                        <UpLoadImage onUploadComplete={handleFileChange} />
                    </Form.Item>
                </Form>
            </Modal>
        </CRow>
    );
};

export default withNamespaces()(ListProduct);

