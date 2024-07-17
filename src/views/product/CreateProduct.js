import React, { useState } from 'react';
import { withNamespaces } from "react-i18next";
import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardHeader
} from '@coreui/react';
import { Form, Input, Button, Modal, notification, Space, Select } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { createProduct } from 'src/services/product';
import UpLoadImage from 'src/containers/UpLoadImage'; 
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const { Option } = Select;

const AddProduct = ({ t }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null); // State để lưu URL của ảnh đã tải lên

  const handleCreateProduct = (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('type', values.type);
    formData.append('code', values.code);
    formData.append('price', values.price);
    formData.append('quantity', values.quantity);
    if (imageUrl) {
      formData.append('photo', imageUrl);
    }

    Modal.confirm({
      title: t('Create Product'),
      icon: <ExclamationCircleOutlined />,
      content: t('You are going to create this product? Are you sure you want to do this? You cannot reverse this'),
      onOk() {
        var submitData = {
          name: values.name,
          type: values.type,
          code: values.code,
          price: values.price,
          quantity: values.quantity,
          photo: imageUrl
      };
        createProduct(submitData, (res) => {
          if (res.status === 1) {
            notification.success({
              message: t('Notification'),
              description: 'Create product successful.',
              placement: 'bottomRight',
              duration: 2,
            });
            window.location.reload()
          } else {
            notification.error({
              message: t('Notification'),
              description: t(`${res.message}`),
              placement: 'bottomRight',
              duration: 2,
            });
          }
        });
      },
      onCancel() {
        notification.info({
          message: t('Notification'),
          description: t('Stop create product'),
          placement: 'bottomRight',
          duration: 1.5,
        });
      },
      centered: true,
    });
  };

  const handleImageUrlChange = (url) => {
    setImageUrl(url); 
  };

  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            {t('New Product')}
          </CCardHeader>
          <CCardBody>
            <Space
              direction="vertical"
              size="middle"
              style={{
                display: 'flex',
              }}
            >
              <Form
                form={form}
                {...formItemLayout}
                encType="multipart/form-data"
                onFinish={handleCreateProduct}
              >
                <Form.Item
                  label={t('Name')}
                  labelAlign="left"
                  name="name"
                  rules={[{
                    required: true,
                    message: t('Please input name!'),
                  }]}
                >
                  <Input placeholder={t('Please input name')} />
                </Form.Item>
                <Form.Item
                  label={t('Code')}
                  labelAlign="left"
                  name="code"
                  rules={[{
                    required: true,
                    message: t('Please input code!'),
                  }]}
                >
                  <Input placeholder={t('Please input code')} />
                </Form.Item>
                <Form.Item
                  label={t('Type')}
                  labelAlign="left"
                  name="type"
                  rules={[{
                    required: true,
                    message: t('Please select type!'),
                  }]}
                >
                  <Select placeholder={t('Please select type')}>
                    <Option value="MEDICINE">{t('Medicine')}</Option>
                    <Option value="GLASSES">{t('Glasses')}</Option>
                    <Option value="OTHER">{t('Other')}</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label={t('Price')}
                  labelAlign="left"
                  name="price"
                  rules={[{
                    required: true,
                    message: t('Please input price!'),
                  }]}
                >
                  <Input type="number" placeholder={t('Please input price')} />
                </Form.Item>
                <Form.Item
                  label={t('Quantity')}
                  labelAlign="left"
                  name="quantity"
                  rules={[{
                    required: true,
                    message: t('Please input quantity!'),
                  }]}
                >
                  <Input type="number" placeholder={t('Please input quantity')} />
                </Form.Item>
                <Form.Item
                  label={t('Image')}
                  labelAlign="left"
                  name="photo"
                >
                  <UpLoadImage onUploadComplete={handleImageUrlChange} />
                </Form.Item>
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                >
                  {t('Create New Product')}
                </Button>
              </Form>
            </Space>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default withNamespaces()(AddProduct);
