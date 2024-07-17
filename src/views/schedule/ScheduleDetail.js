import React, { useEffect, useState } from "react";
import moment from "moment";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import {
  Table,
  Tag,
  Space,
  notification,
  Button,
  Modal,
  Form,
  Input,
} from "antd";
import {
  ExclamationCircleOutlined,
  // UploadOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";
// import { Notification, Roles, Status, Type } from "src/configs";
import { Link } from "react-router-dom";
// import moment from 'moment';
// import { useSelector } from 'react-redux';
import { numberWithCommas } from "src/services/money";
import { withNamespaces } from "react-i18next";
import { pagination as pag } from "src/configs/Pagination";
import { getScheduleDetail, removeDoctorSchedule } from "src/services/schedule";

const ScheduleDetail = ({ match, t }) => {
  const [pagination, setPagination] = useState(pag);
  const [data, setData] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();
  const storedUser = localStorage.getItem('eyesclinicsystem_user') || null;
  const user = JSON.parse(storedUser) || null;
  const userId = user?._id;
  const userRole = user?.role;
  // console.log('role', userRole);
  const columns = [
    {
      title: t("ID"),
      dataIndex: "key",
    },
    {
      title: t("Patient"),
      dataIndex: "patient_name",
    },
    {
      title: t("Doctor"),
      dataIndex: "doctor_name",
    },
    {
      title: t("Time"),
      dataIndex: "timeType_name",

    },
    {
      title: t("Date"),
      dataIndex: "date",
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
    {
      title: t("Number"),
      dataIndex: "number",
    },
    {
      title: t("Status"),
      dataIndex: "status",
      render: (status) => {
        let color, name;
        switch (status) {
          case 0:
            color = "gold";
            name = "Chưa kiểm tra";
            break;
          case 1:
            color = "blue";
            name = "Đã đo";
            break;
          case 2:
            color = "green";
            name = "Đã khám";
            break;
          case 3:
            color = "red";
            name = "Đã hủy";
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
      filters: [
        {
          text: 'Chưa kiểm tra',
          value: 0,
        },
        {
          text: 'Đã đo',
          value: 1,
        },
        {
          text: 'Đã khám',
          value: 2,
        },
        {
          text: 'Đã hủy',
          value: 3,
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: t("Action"),
      dataIndex: "_id",
      render: (_id) => {
        return (
          <>
            <Space size="middle">
              <Link to={`/history/${_id}`}>{t("Xem lịch sử")}</Link>
            </Space>

          </>
        );
      },
    },
    userRole == 'NURSE' ?
      {
        title: t("Action"),
        dataIndex: "_id",
        render: (_id) => {

          return (
            <>
              <Space size="middle">
                <Link to={`/history/create/${_id}`}>{t("Đo mắt")}</Link>
              </Space>

            </>
          );
        },
      } : userRole == 'DOCTOR' ?
        {
          title: t("Action"),
          dataIndex: "_id",
          render: (_id) => {
            return (
              <>
                <Space size="middle">
                  <Link to={`/history/update/${_id}`}>{t("Khám mắt")}</Link>
                </Space>

              </>
            );
          },
        } : userRole == 'PATIENT' ?
          {
            title: t(""),
            dataIndex: "_id",
            render: (_id) => {
              return (
                <>
                  <Space size="middle">
                    {/* <Link to={`/schedules/${_id}`}>{t("Register")}</Link> */}
                    <Button onClick={handleDeleteClick}>{t("Delete")}</Button>
                  </Space>
                </>
              );
            },
          } : {}

  ];
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePhoneNumberChange = (e) => {
    // setPhoneNumber(e.target.value);
  };

  const handleAddNewPatient = () => {
    console.log("Add new patient with phone number:");
    setIsModalVisible(false);
  };
  const handleDeleteClick = (id) => {
    Modal.confirm({
      title: t(`Đăng ký lịch khám`),
      icon: <ExclamationCircleOutlined />,
      content: t(
        `You are going to delete this schedule? Are you sure you want to do this? You can't reverse this`
      ),
      onOk() {
        removeDoctorSchedule(id, (res) => {
          if (res.status === 1) {
            notification.success({
              message: t(`Notification`),
              description: `delete schedule of patient successful.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
            // setIsFinalUpdate(true)
            history.push(`/schedules/${id}`);
          } else {
            notification.error({
              message: t(`Notification`),
              description: `delete schedule of patient failed.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
          }
        });
      },
      onCancel() {
        notification.info({
          message: t(`Notification`),
          description: t(`Stop Create schedule of patient`),
          placement: `bottomRight`,
          duration: 1.5,
        });
      },
      centered: true,
    });
  }
  const handleTableChange = (pagination, filters, sorter) => {
    let key = pagination.pageSize * (pagination.current - 1) + 1;
    getScheduleDetail(match.params.id, pagination, {}, {}, (res) => {
      console.log('nnqa')
      if (res.status === 1) {
        res.data.schedule_list.forEach((schedule) => {
          schedule.key = key++;
        });

        setData(res.data.schedule_list);
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
    getScheduleDetail(match.params.id, pagination, {}, {}, (res) => {
      console.log(123)
      if (res.status === 1) {
        let key = 1;
        res.data.schedule_list.forEach((schedule) => {
          schedule.key = key++;
        });
        setData(res.data.schedule_list);
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
          <CCardHeader>{t("List Patient of Doctor's Schedules")}</CCardHeader>
          <CCardBody>
            {/* <Button type="primary" onClick={showModal}>
              <PlusSquareOutlined /> {t("Add New")}
            </Button>
            <Modal
              title={t("Add New Patient")}
              visible={isModalVisible}
              onOk={handleAddNewPatient}
              onCancel={handleCancel}
            >
              <Form.Item label={t("Phone Number")}>
                <Input
                  // value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </Form.Item>
            </Modal> */}
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

export default withNamespaces()(ScheduleDetail);
