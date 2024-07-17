import React, { useEffect, useState } from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { DatePicker} from 'antd';
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
  notification,
  Upload,
  Avatar,
  Radio,
  Divider,
} from "antd";
import Roles from "src/configs/Roles";
import Genders from "src/configs/Genders";
import {
  Validate
} from 'src/configs';
import { createUser } from "src/services/user";
import {
  ExclamationCircleOutlined,
  UploadOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { withNamespaces } from "react-i18next";
import { useHistory } from "react-router";
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

const AddUser = ({ t }) => {
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    console.log(Roles);
  }, []);
  const onFinish = (values) => {
    var submitData = {
      phone: values.phone,
      password: values.password,
      role: values.role,
      name: values.name,
      email: values.email,
      address: values.address,
      gender: values.gender,
      dob: values.dob
    };
    console.log(submitData);
    Modal.confirm({
      title: t(`Create USER`),
      icon: <ExclamationCircleOutlined />,
      content: t(
        `You are going to create this user? Are you sure you want to do this? You can't reverse this`
      ),
      onOk() {
        createUser(submitData, (res) => {
          console.log(res)
          if (res.status === 1) {
            notification.success({
              message: t(`Notification`),
              description: `Create sale successful.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
            // setIsFinalUpdate(true)
            history.push("/users");
          } else {
            notification.error({
              message: t(`Notification`),
              description: t(res.message),
              placement: `bottomRight`,
              duration: 1.5,
            });
          }
        });
      },
      onCancel() {
        notification.info({
          message: t(`Notification`),
          description: t(`Stop create sale`),
          placement: `bottomRight`,
          duration: 1.5,
        });
      },
      centered: true,
    });
  };

  return (
    <CRow>
      <CCol xs="12" md="9" className="mb-4">
        <CCard>
          <CCardHeader
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            {t("Add User")}
          </CCardHeader>
          <CCardBody>
            <Form form={form} {...formItemLayout} onFinish={onFinish}>
              <Form.Item
                label={t("Name")}
                labelAlign="left"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input name!",
                  },
                ]}
              >
                <Input placeholder="Please input name" />
              </Form.Item>
              <Form.Item
                label={t("Email")}
                labelAlign="left"
                name="email"
                rules={[
                  {
                    required: false,
                    message: "Please input email!",
                  },
                ]}
              >
                <Input placeholder="Please input email" />
              </Form.Item>
              <Form.Item
                label={t("Address")}
                labelAlign="left"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input address!",
                  },
                ]}
              >
                <Input placeholder="Please input address" />
              </Form.Item>
              <Form.Item
                label={t("Phone")}
                labelAlign="left"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input phone number!",
                  },
                ]}
              >
                <Input placeholder="Please input phone number" />
              </Form.Item>
              <Form.Item
                label={t("Role")}
                labelAlign="left"
                name="role"
                initialValue={Roles.PATIENT}
              >
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select roles"
                  optionFilterProp="role"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                // disabled
                >
                  {[Roles.DOCTOR, Roles.PATIENT, Roles.NURSE, Roles.RECEPTIONIST, Roles. SALE].map((item, index) => (
                    <Select.Option value={item} key={index}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={t("Gender")}
                labelAlign="left"
                name="gender"
                initialValue={Genders.MALE}
              >
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select gender"
                  optionFilterProp="gender"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {[Genders.MALE, Genders.FEMALE, Genders.OTHER].map((item, index) => (
                    <Select.Option value={item} key={index}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={t("Date of Birth")}
                labelAlign="left"
                name="dob"
              >
                <DatePicker style={{ width: "100%" }} placeholder="Select date" />
              </Form.Item>
              <Divider />
              <Form.Item
                label={t("Password")}
                labelAlign="left"
                name="password"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: t(`Please input password!`),
                  },
                ]}
              >
                <Input.Password placeholder="Please input the password" />
              </Form.Item>
              <Form.Item
                label={t("Confirm Password")}
                labelAlign="left"
                dependencies={["password"]}
                name="confirm"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: t(`Please confirm password!`),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Please confirm the password" />
              </Form.Item>
              <Button type="primary" block htmlType="submit">
                {t("Create")}
              </Button>
            </Form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default withNamespaces()(AddUser);
