import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow
} from '@coreui/react'
import {
  Form,
  Input,
  Button,
  Radio,
  message,
  Select, DatePicker
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { Roles, Validate } from 'src/configs';
import Genders from "src/configs/Genders";
import { register } from 'src/services/user';
import { withNamespaces } from 'react-i18next';

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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = ({ t, location }) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false)

  const history = useHistory();

  const onFinish = (values) => {
    setLoading(true);

    let data = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      password: values.password,
      role: values.role,
      address: values.address,
      gender: values.gender,
      dob: values.dob
    };

    register(data, res => {
      setLoading(false);

      if (res.status === 1) {
        message.success(res.message);
        history.push('/login');
      } else {
        if (res.message) {
          message.error(res.message);
        } else if (res.errors) {
          message.error(res.errors[0].msg);
        }
      }
    })
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <Form
                  {...formItemLayout}
                  form={form}
                  name="register"
                  onFinish={onFinish}
                  scrollToFirstError
                >
                  <h1 className="text-center">{t("Register")}</h1>
                  <p className="text-center">{t("Register your account")}</p>
                  <Form.Item
                    name="phone"
                    label={t("Phone")}
                    rules={[
                      {
                        validator: (_, value) => {
                          if (value) {
                            let regex_phone = new RegExp(Validate.REGEX_PHONE);
                            if (regex_phone.test(value)) {
                              return Promise.resolve();
                            } else {
                              return Promise.reject(new Error(t('Please enter a valid phone number!')));
                            }
                          } else {
                            return Promise.reject(new Error(t('Please input a phone number!')));
                          }
                        },
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label={t("E-mail")}
                    rules={[
                      {
                        type: 'email',
                        message: t("The input is not valid E-mail!"),
                      },
                      {
                        required: true,
                        message: t("Please input your E-mail!"),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label={t("Password")}
                    rules={[
                      {
                        required: true,
                        message: t('Please input your password!'),
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="confirm"
                    label={t("Confirm Password")}
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: t('Please confirm your password!'),
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error(t('The two passwords that you entered do not match!')));
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="name"
                    label={
                      <span>
                        {t("Nickname")}&nbsp;
                      </span>
                    }
                    rules={[{ required: true, message: t('Please input your nickname!'), whitespace: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={t("Address")}
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
                    label={t("Gender")}
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
                    name="dob"
                  >
                    <DatePicker style={{ width: "100%" }} placeholder="Select date" />
                  </Form.Item>
                <Form.Item
                  name="role"
                  label={t("Role")}
                  rules={[{ required: true, message: t('Please select your type of account!') }]}
                >
                  <Radio.Group>
                    <Radio value={Roles.DOCTOR}>{Roles.DOCTOR}</Radio>
                    <Radio value={Roles.NURSE}>{Roles.NURSE}</Radio>
                    <Radio value={Roles.PATIENT}>{Roles.PATIENT}</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
                    {t("Register")}
                  </Button>
                  {t("Or")} <Link to="/login">{t("login now!")}</Link>
                </Form.Item>
              </Form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
    </div >
  )
}

export default withNamespaces()(Register)
