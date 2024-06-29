import React, { useState } from 'react'
import { withNamespaces } from "react-i18next"
import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardHeader
} from '@coreui/react';
import { Table, Space, Button, Form, Input, Tag, Divider, Modal, notification } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { createNotification } from 'src/services/notification';
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

const AddNotification = ({ t }) => {

  const [form, form1] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);

  const handleNewNotification = (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    if (imageUrl) {
      formData.append('photo', imageUrl);
    }

    Modal.confirm({
      title: t(`Create Notification`),
      icon: <ExclamationCircleOutlined />,
      content: t(`You are going to create this notification? Are you sure you want to do this? You can't reverse this`),
      onOk() {
        var submitData = {
          title: values.title,
          content: values.content,
          photo: imageUrl
        }
        createNotification(submitData, (res) => {
          if (res.status === 1) {

            notification.success({
              message: t(`Notification`),
              description: `Create notification successful.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
          } else {
            notification.error({
              message: t(`Notification`),
              description: t(`${res.message}`),
              placement: `bottomRight`,
              duration: 1.5,
            });
          }
        })
      },
      onCancel() {
        notification.info({
          message: t(`Notification`),
          description: t(`Stop create notification`),
          placement: `bottomRight`,
          duration: 1.5,
        });
      },
      centered: true,
    });
  }

  const handleImageUrlChange = (url) => {
    setImageUrl(url); 
  };

  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            {t("New notification")}
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
                onFinish={handleNewNotification}
              >
                <Form.Item
                  label={t("Title")}
                  labelAlign="left"
                  name="title"
                  rules={
                    [{
                      required: true,
                      message: t("Please input title!"),
                    },]
                  }
                >
                  <Input placeholder={t('Please input title')} />
                </Form.Item>
                <Form.Item
                  label={t("Content")}
                  labelAlign="left"
                  name="content"
                  rules={
                    [{
                      required: true,
                      message: t("Please input content!"),
                    },]
                  }
                >
                  {/* <Input placeholder={t('Please input content')} /> */}
                  <Input.TextArea 
                    placeholder={t('Please input content')} 
                    rows={6} // Điều chỉnh số hàng để tăng kích thước
                  />
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
                  Tạo thông báo mới
                </Button>
              </Form>
            </Space>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default withNamespaces()(AddNotification);