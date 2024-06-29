import React, { useEffect, useState } from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { Status } from "src/configs";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  notification,
  Upload,
  Avatar,
  Radio,
  Divider,
} from "antd";
// import { useSelector } from 'react-redux';
import {
  getDoctorDetail,
  removeDoctor,
  updateDoctor,
} from "src/services/doctor";
import {
  ExclamationCircleOutlined,
  UploadOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { withNamespaces } from "react-i18next";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
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

// const tailLayout = {
//     wrapperCol: { offset: 8, span: 16 },
// };

// const { Option } = Select;

const DoctorDetail = ({ match, t }) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [doctor, setData] = useState();
  const storedUser = localStorage.getItem('eyesclinicsystem_user') || null;
  const user = JSON.parse(storedUser) || null;
  // const userId = user._id;
  // const userRole = user.role;
  const handleGetSchedule = () => {
    if (user?._id) {
      const doctor_id = match.params.id;
      history.push(`/schedules/doctor/${doctor_id}`);

    } else {
      // Kiểm tra nếu người dùng chưa đăng nhập
      // history.push("/login"); // Chuyển hướng sang trang đăng nhập
      window.location.href = "/login";
      // return <Redirect to={pathname} />
    }
  };
  const updateDoctorHandler = (values) => {
    const doctor_id = match.params.id;
    Modal.confirm({
      title: t(`Update doctor`),
      icon: <ExclamationCircleOutlined />,
      content: t(
        `You are going to update the infomation of this doctor ? Are you sure you want to do this? You can't reverse this`
      ),
      onOk() {
        updateDoctor(doctor_id, values, (res) => {
          if (res.status === 1) {
            notification.success({
              message: t(`Notification`),
              description: `Update doctor Successful.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
            // setIsFinalUpdate(true)
            history.push("/doctors");
          } else {
            notification.error({
              message: t(`Notification`),
              description: `Update doctor Failed.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
          }
        });
      },
      onCancel() {
        notification.info({
          message: t(`Notification`),
          description: t(`Stop update doctor's information`),
          placement: `bottomRight`,
          duration: 1.5,
        });
      },
      centered: true,
    });
  };
  useEffect(() => {
    getDoctorDetail(match.params.id, (res) => {
      if (res.status === 1) {
        setData(res.data.doctor_info);
        console.log(doctor)
      } else {
        notification.error({
          message: t(`Notification`),
          description: `Get doctor's Information Failed`,
          placement: `bottomRight`,
          duration: 1.5,
        });
      }
    });
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
            {t("doctor Detail")}
          </CCardHeader>
          <CCardBody>
            <Form
              form={form}
              {...formItemLayout}
              onFinish={updateDoctorHandler}
            >
              <Form.Item
                label={t("Image")}
                labelAlign="left"
              // name="phone"
              >
                {doctor ? <img
                  src={doctor.image}
                  alt="Doctor's Image"
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    // Thêm bất kỳ style CSS nào bạn muốn áp dụng vào hình ảnh
                  }}
                /> : <span>{t("EMPTY")}</span>}
              </Form.Item>
              <Form.Item
                label={t("Name")}
                labelAlign="left"
              // name="phone"
              >
                {doctor ? <span>{doctor.name}</span> : <span>{t("EMPTY")}</span>}
              </Form.Item>
              <Form.Item
                label={t("Age")}
                labelAlign="left"
              // name="phone"
              >
                {doctor ? <span>{doctor.age}</span> : <span>{t("EMPTY")}</span>}
              </Form.Item>
              <Form.Item
                label={t("Gender")}
                labelAlign="left"
              // name="phone"
              >
                {doctor ? <span>{doctor.gender}</span> : <span>{t("EMPTY")}</span>}
              </Form.Item>
              <Form.Item
                label={t("Hospital")}
                labelAlign="left"
              // name="role"
              >
                {doctor ? <span>{doctor.hospital}</span> : <span>{t("EMPTY")}</span>}
              </Form.Item>
              <Form.Item
                label={t("Degree")}
                labelAlign="left"
              // name="phone"
              >
                {doctor ? <span>{doctor.degree}</span> : <span>{t("EMPTY")}</span>}
              </Form.Item>
              <Form.Item
                label={t("experience")}
                labelAlign="left"
              // name="phone"
              >
                {doctor ? <span>{doctor.experience}</span> : <span>{t("EMPTY")}</span>}
              </Form.Item>

              <Form.Item
                label={t("achievements")}
                labelAlign="left"
              // name="phone"
              >
                {doctor ? <span>{doctor.achievements}</span> : <span>{t("EMPTY")}</span>}
              </Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {(user?.role === 'ADMIN' || user?.role === 'PATIENT' || user === null)  ? (
                <Button
                  style={{ marginLeft: 4 }}
                  type="primary"
                  block
                  onClick={handleGetSchedule}
                >
                  {t("Đăng ký lịch")}
                </Button>
                ):null} 
              </div>
            </Form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default withNamespaces()(DoctorDetail);
