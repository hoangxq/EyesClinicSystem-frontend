import React, { useEffect, useState } from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { Status } from "src/configs";
import {
  Button,
  Modal,
  Form,
  Input,
  notification,
  Divider,
} from "antd";
// import { useSelector } from 'react-redux';
import {
  blockUser,
  updateUserPassword,
  getUserDetails,
  unblockUser,
} from "src/services/user";
import {
  createDoctorInfo,
  getDoctorDetailByUserId
} from "src/services/doctor";
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


const UserDetail = ({ match, t }) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [user, setData] = useState();
  const [doctor, setDoctor] = useState();
  const [isDoctorRole, setIsDoctorRole] = useState(false);
  const handleBlockUser = () => {
    const user_id = match.params.id;
    Modal.confirm({
      title: t(`Block user`),
      icon: <ExclamationCircleOutlined />,
      content: t(
        `You are going to block this user? Are you sure you want to do this? You can't reverse this`
      ),
      onOk() {
        blockUser(user_id, (res) => {
          if (res.status === 1) {
            notification.success({
              message: t(`Notification`),
              description: `Block user successful.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
            // setIsFinalUpdate(true)
            history.push("/users");
          } else {
            notification.error({
              message: t(`Notification`),
              description: `Block user failed.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
          }
        });
      },
      onCancel() {
        notification.info({
          message: t(`Notification`),
          description: t(`Stop block user`),
          placement: `bottomRight`,
          duration: 1.5,
        });
      },
      centered: true,
    });
  };
  const handleUnBlockUser = () => {
    const user_id = match.params.id;
    Modal.confirm({
      title: t(`UnBlock user`),
      icon: <ExclamationCircleOutlined />,
      content: t(
        `You are going to unblock this user? Are you sure you want to do this? You can't reverse this`
      ),
      onOk() {
        unblockUser(user_id, (res) => {
          if (res.status === 1) {
            notification.success({
              message: t(`Notification`),
              description: `UnBlock user successful.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
            // setIsFinalUpdate(true)
            history.push("/users");
          } else {
            notification.error({
              message: t(`Notification`),
              description: `UnBlock user failed.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
          }
        });
      },
      onCancel() {
        notification.info({
          message: t(`Notification`),
          description: t(`Stop block user`),
          placement: `bottomRight`,
          duration: 1.5,
        });
      },
      centered: true,
    });
  };
  const changeUserPassword = (values) => {
    const user_id = match.params.id;
    const submitData = {
      new_password: values.new_password,
    };
    console.log(submitData);
    Modal.confirm({
      title: t(`Update Password user`),
      icon: <ExclamationCircleOutlined />,
      content: t(
        `You are going to update password this user? Are you sure you want to do this? You can't reverse this`
      ),
      onOk() {
        updateUserPassword(user_id, submitData, (res) => {
          if (res.status === 1) {
            notification.success({
              message: t(`Notification`),
              description: `Update password successful.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
            // setIsFinalUpdate(true)
            history.push("/users");
          } else {
            notification.error({
              message: t(`Notification`),
              description: `Update password failed.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
          }
        });
      },
      onCancel() {
        notification.info({
          message: t(`Notification`),
          description: t(`Stop update password`),
          placement: `bottomRight`,
          duration: 1.5,
        });
      },
      centered: true,
    });
  };
  const handleCreateDoctor = (values) => {
    const user_id = match.params.id;
    const doctorData = {
      userId: user_id,
      hospital: values.hospital,
      degree: values.degree,
      achievement: values.achievement,
      experience: values.experience,
    };
    Modal.confirm({
      title: t(`Update Doctor Infor `),
      icon: <ExclamationCircleOutlined />,
      content: t(
        `You are going to update Doctor Infor ? Are you sure you want to do this? You can't reverse this`
      ),
      onOk() {
        createDoctorInfo(doctorData, (res) => {
          if (res.status === 1) {
            notification.success({
              message: t(`Notification`),
              description: `Update doctor info successful.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
            // setIsFinalUpdate(true)
            history.push("/users");
          } else {
            notification.error({
              message: t(`Notification`),
              description: `Update doctor info failed.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
          }
        });
      },
      onCancel() {
        notification.info({
          message: t(`Notification`),
          description: t(`Stop update password`),
          placement: `bottomRight`,
          duration: 1.5,
        });
      },
      centered: true,
    });
  };
  useEffect(() => {
    getUserDetails(match.params.id, (res) => {
      if (res.status === 1) {
        setData(res.data.user_info);
        if (res.data.user_info.role === 'DOCTOR') {
          setIsDoctorRole(true);
        }
      } else {
        notification.error({
          message: t(`Notification`),
          description: `Get User failed.`,
          placement: `bottomRight`,
          duration: 1.5,
        });
      }
    });
    // getDoctorDetailByUserId(match.params.id, (res) => {
    //   if (res.status === 1) {
    //     setDoctor(res.data.doctor_info);
    //     console.log(doctor)
    //   } else {
    //     notification.error({
    //       message: t(`Notification`),
    //       description: `Get doctor's Information Failed`,
    //       placement: `bottomRight`,
    //       duration: 1.5,
    //     });
    //   }
    // });
  }, []);


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
            {t("User Detail")}
          </CCardHeader>
          <CCardBody>
            <Form form={form} {...formItemLayout} onFinish={changeUserPassword}>
              <Form.Item
                label={t("Name")}
                labelAlign="left"
              // name="phone"
              >
                {/* <Input
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  placeholder={t("Name")}
                /> */}
                {user ? <span>{user.name}</span> : <span>{t("EMPTY")}</span>}
              </Form.Item>
              <Form.Item
                label={t("Phone")}
                labelAlign="left"
              // name="phone"
              >
                {user ? <span>{user.phone}</span> : <span>{t("EMPTY")}</span>}
              </Form.Item>
              <Form.Item
                label={t("Type")}
                labelAlign="left"
              // name="role"
              >
                {user ? <span>{user.role}</span> : <span>{t("EMPTY")}</span>}
              </Form.Item>
              <Form.Item
                label={t("Gender")}
                labelAlign="left"
              // name="phone"
              >
                {user ? <span>{user.gender}</span> : <span>{t("EMPTY")}</span>}
              </Form.Item>
              <Form.Item
                label={t("Ngày sinh")}
                labelAlign="left"
              // name="phone"
              >
                {user ? <span>{user.dob}</span> : <span>{t("EMPTY")}</span>}
              </Form.Item>
              <Form.Item
                label={t("Tuổi")}
                labelAlign="left"
              // name="phone"
              >
                {user ? <span>{user.age}</span> : <span>{t("EMPTY")}</span>}
              </Form.Item>

              <Form.Item
                label={t("Address")}
                labelAlign="left"
              // name="phone"
              >
                {user ? <span>{user.address}</span> : <span>{t("EMPTY")}</span>}
              </Form.Item>
              <Form.Item
                label={t("Email")}
                labelAlign="left"
              // name="phone"
              >
                {user ? <span>{user.email}</span> : <span>{t("EMPTY")}</span>}
              </Form.Item>
              <Form.Item
                label={t("Status")}
                labelAlign="left"
              // name="role"
              >
                {user ? (
                  <>
                    {user.status === Status.ACTIVE.id ? (
                      <span>{Status.ACTIVE.name}</span>
                    ) : user.status === Status.INACTIVE.id ? (
                      <span>{Status.INACTIVE.name}</span>
                    ) : user.status === Status.BLOCK.id ? (
                      <span>{Status.BLOCK.name}</span>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <span>{t("EMPTY")}</span>
                )}
              </Form.Item>
              <Divider />
              {isDoctorRole && (
                <>
                  {/* Form thông tin bác sĩ */}
                  <Form.Item
                    label={t("Hospital")}
                    labelAlign="left"
                    name="hospital"
                    rules={[
                      {
                        required: true,
                        message: "Please input hospital!",
                      },
                    ]}
                  >
                    <Input placeholder="Please input hospital" />
                  </Form.Item>
                  <Form.Item
                    label={t("Degree")}
                    labelAlign="left"
                    name="degree"
                    rules={[
                      {
                        required: true,
                        message: "Please input degree!",
                      },
                    ]}
                  >
                    <Input placeholder="Please input degree" />
                  </Form.Item>
                  <Form.Item
                    label={t("Achivement")}
                    labelAlign="left"
                    name="achievement"
                    rules={[
                      {
                        required: false,
                        message: "Please input achievement!",
                      },
                    ]}
                  >
                    <Input placeholder="Please input achievement" />
                  </Form.Item>
                  <Form.Item
                    label={t("Experience")}
                    labelAlign="left"
                    name="experience"
                    rules={[
                      {
                        required: true,
                        message: "Please input experience!",
                      },
                    ]}
                  >
                    <Input placeholder="Please input experience" />
                  </Form.Item>
                  {/* Thêm các trường thông tin khác của bác sĩ tại đây */}
                </>
              )}
              <Form.Item
                label={t("New Password")}
                labelAlign="left"
                name="new_password"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input new password!",
                  },
                ]}
              >
                <Input.Password placeholder="Please input the new password" />
              </Form.Item>
              <Form.Item
                label={t("Confirm Password")}
                labelAlign="left"
                name="confirm"
                dependencies={["new_password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("new_password") === value) {
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
                <Input.Password placeholder="Please confirm the new password" />
              </Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  style={{ marginLeft: 4 }}
                  type="primary"
                  block
                  htmlType="submit"
                >
                  {t("Change Password")}
                </Button>
                <Button
                  style={{ background: "rgb(190, 200, 200)", marginLeft: 4 }}
                  ghost
                  block
                  onClick={handleBlockUser}
                >
                  {t("Block User")}
                </Button>
                <Button
                  style={{ background: "rgb(190, 200, 200)", marginLeft: 4 }}
                  ghost
                  block
                  onClick={handleUnBlockUser}
                >
                  {t("UnBlock User")}
                </Button>
              </div>
              <div>
                {isDoctorRole && (
                  <Button
                    style={{ marginLeft: 4, marginTop: 10 }}
                    type="primary"
                    block
                    htmlType="submit"
                    onClick={() => {
                      const values = form.getFieldsValue(); // Lấy giá trị từ các trường FormInput
                      handleCreateDoctor(values); // Truyền giá trị vào hàm handleCreateDoctor
                    }}
                  >
                    {t("Update Doctor Information")}
                  </Button>
                )}
              </div>
            </Form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default withNamespaces()(UserDetail);
