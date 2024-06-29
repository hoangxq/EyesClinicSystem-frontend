import React, { useState, useEffect } from 'react';
import { withNamespaces } from "react-i18next";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from '@coreui/react';
import { Table, Space, Button, notification, Form, Input, InputNumber } from 'antd';
import { getAllProducts } from 'src/services/product';
import { createInvoice } from 'src/services/invoice';
import { useHistory } from "react-router-dom";

const CreateInvoice = ({ t }) => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [form] = Form.useForm();
    const [searchKeyword, setSearchKeyword] = useState(''); // State cho từ khóa tìm kiếm
    const [filteredProducts, setFilteredProducts] = useState([]); // State cho danh sách sản phẩm được lọc
    const history = useHistory();

    useEffect(() => {
        getAllProducts({}, {}, {}, (res) => {
            if (res.status === 1) {
                setProducts(res.data.product_list);
                setFilteredProducts(res.data.product_list); 
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

    const handleAddProduct = (product) => {
        const existingProduct = selectedProducts.find(p => p._id === product._id);
        if (existingProduct) {
            const updatedProducts = selectedProducts.map(p =>
                p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
            );
            setSelectedProducts(updatedProducts);
        } else {
            setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
        }
    };

    const handleRemoveProduct = (productId) => {
        const updatedProducts = selectedProducts.filter(p => p._id !== productId);
        setSelectedProducts(updatedProducts);
    };

    const handleQuantityChange = (productId, quantity) => {
        const updatedProducts = selectedProducts.map(p =>
            p._id === productId ? { ...p, quantity: quantity } : p
        );
        setSelectedProducts(updatedProducts);
    };

    const handleCreateInvoice = (values) => {
        const invoiceData = {
            ...values,
            products: selectedProducts,
            totalPrice: totalPrice,
        };

        createInvoice(invoiceData, (res) => {
            if (res.status === 1) {
                notification.success({
                    message: t('Notification'),
                    description: 'Invoice created successfully.',
                    placement: 'bottomRight',
                    duration: 1.5,
                });
                form.resetFields();
                setSelectedProducts([]);
                history.push(`/invoice/${res.data.invoice._id}`);
            } else {
                notification.error({
                    message: t('Notification'),
                    description: t(`${res.message}`),
                    placement: 'bottomRight',
                    duration: 1.5,
                });
            }
        });
    };

    const handleSearchProducts = (value) => {
        setSearchKeyword(value.trim().toLowerCase());
        if (value.trim() === '') {
            setFilteredProducts(products); // Nếu không có từ khóa tìm kiếm, hiển thị tất cả sản phẩm
        } else {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(value.trim().toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    const productColumns = [
        { title: t('Name'), dataIndex: 'name' },
        { title: t('Code'), dataIndex: 'code' },
        { title: t('Price'), dataIndex: 'price' },
        {
            title: t('Action'),
            dataIndex: '_id',
            render: (_id, record) => (
                <Space size="middle">
                    <Button onClick={() => handleAddProduct(record)}>{t('Add')}</Button>
                </Space>
            ),
        },
    ];

    const invoiceColumns = [
        { title: t('Name'), dataIndex: 'name' },
        { title: t('Code'), dataIndex: 'code' },
        { title: t('Price'), dataIndex: 'price' },
        {
            title: t('Quantity'),
            dataIndex: 'quantity',
            render: (quantity, record) => (
                <InputNumber min={1} value={quantity} onChange={(value) => handleQuantityChange(record._id, value)} />
            ),
        },
        {
            title: t('Action'),
            dataIndex: '_id',
            render: (_id) => (
                <Space size="middle">
                    <Button onClick={() => handleRemoveProduct(_id)}>{t('Remove')}</Button>
                </Space>
            ),
        },
    ];

    const totalPrice = selectedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);

    return (
        <CRow>
            <CCol xs="12" md="12" className="mb-4">
                <CCard>
                    <CCardHeader>{t('Create New Invoice')}</CCardHeader>
                    <CCardBody>
                        <Form form={form} onFinish={handleCreateInvoice}>
                            <Form.Item name="customerPhone" label={t('Customer Phone')} rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <h3>{t('Available Products')}</h3>
                            <Input.Search
                                placeholder={t('Search Products')}
                                allowClear
                                enterButton={t('Search')}
                                onSearch={handleSearchProducts}
                                style={{ width: 300, marginBottom: 16 }}
                            />
                            <Table columns={productColumns} dataSource={filteredProducts} rowKey="_id" pagination={false} />
                            <h3>{t('Selected Products')}</h3>
                            <Table columns={invoiceColumns} dataSource={selectedProducts} rowKey="_id" pagination={false} />
                            <h3>{t('Total Price')}: {totalPrice}</h3>
                            <Button type="primary" htmlType="submit">{t('Create Invoice')}</Button>
                        </Form>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default withNamespaces()(CreateInvoice);
