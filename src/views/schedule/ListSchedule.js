import React, { useEffect, useState } from "react";
import moment from "moment";
import removeDiacritics from 'remove-diacritics';
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import {
  Table,
  Space,
  notification,
  Modal,
  Input,
  Button,
  Form
} from "antd";
import {
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Notification, Roles, Status, Type } from "src/configs";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { withNamespaces } from "react-i18next";
import { pagination as pag } from "src/configs/Pagination";
import { getListSchedules, createDoctorSchedule, createDoctorScheduleByPhoneNumber } from "src/services/schedule";
import { searchUserByPhoneNumber } from "src/services/user";

const ListSchedule = ({ t }) => {
  const [pagination, setPagination] = useState(pag);
  const [data, setData] = useState();
  const [searchText, setSearchText] = useState("");
  const [originalData, setOriginalData] = useState();
  const [filterTime, setFilterTime] = useState(null);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchedUser, setSearchedUser] = useState(null); // State lưu trữ thông tin user tìm thấy
  const [registerModalData, setRegisterModalData] = useState({
    // Các trường dữ liệu cho form đăng ký thành viên mới
    name: "",
    email: "",
    phone: "",
    // Các trường dữ liệu khác cần thiết
  });
  const history = useHistory();
  const storedUser = localStorage.getItem('eyesclinicsystem_user') || null;
  const user = JSON.parse(storedUser) || null;
  const userId = user?._id;
  const userRole = user?.role;
  console.log('role', userRole)
  const columns = [
    {
      title: t("ID"),
      dataIndex: "key",
    },
    {
      title: t("Doctor"),
      dataIndex: "doctor_name",
    },
    {
      title: t("Time"),
      dataIndex: "timeType_name",
      filters: [
        {
          text: 'ca 1',
          value: 'ca 1',
        },
        {
          text: 'ca 2',
          value: 'ca 2',
        },
        {
          text: 'ca 3',
          value: 'ca 3',
        },
        {
          text: 'ca 4',
          value: 'ca 4',
        },
      ],
      onFilter: (value, record) => record.timeType_name.indexOf(value) === 0,
    },
    {
      title: t("Date"),
      dataIndex: "date",
      defaultSortOrder: 'descend',
      sorter: (a, b) => moment(a.date) - moment(b.date),
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
    {
      title: t("Current Number"),
      dataIndex: "currentNumber",
    },
    (userRole === 'DOCTOR' || userRole === 'ADMIN' || userRole === 'NURSE'|| userRole === 'RECEPTIONIST') ?
      {
        title: t("Action"),
        dataIndex: "_id",
        render: (_id) => {
          return (
            <>
              <Space size="middle">
                <Link to={`/schedules/${_id}`}>{t("Detail")}</Link>
              </Space>
            </>
          );
        },
      } :
      {
        title: t(""),
        dataIndex: "_id",
        render: (_id) => {
          return (
            <>
              <Space size="middle">
                <Button onClick={() => handleRegisterClick(_id, userId)}>{t("Register")}</Button>
              </Space>
            </>
          );
        },
      },
    (userRole === 'ADMIN' || userRole === 'RECEPTIONIST' )?
      {
        title: t(""),
        dataIndex: "_id",
        render: (_id) => {
          return (
            <>
              <Space size="middle">
                <Button onClick={() => handleRegisterAdminClick(_id)}>{t("Thêm bệnh nhân")}</Button>
              </Space>
            </>
          );
        },
      }:
      {

      }
  ];

  const handleSearch = (value) => {
    setSearchText(value);
    filterData(value);
  };

  const filterData = (value) => {
    const normalizedSearchText = removeDiacritics(value.toLowerCase());
    const filteredData = originalData.filter((item) => {
      const normalizedDoctorName = removeDiacritics(item.doctor_name.toLowerCase());
      return normalizedDoctorName.includes(normalizedSearchText);
    });

    setData(filteredData);
  };

  const handleRegisterAdminClick = (id) => {
    setIsModalVisible(true);
    setSelectedRecordId(id)
  };

  const handleShowRegisterModal = () => {
    setIsRegisterModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsRegisterModalVisible(false);
    setSearchedUser(null);
    setPhoneNumber(""); 
  };

  const handlePhoneNumberChange = async (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
  };

  const handleSearchUser = async () => {
    searchUserByPhoneNumber(phoneNumber, (data) => {
      if (data.data.user_info) {
        setSearchedUser(data.data.user_info);
      } else {
        setSearchedUser(null);
      }
    });
  };

  const handleAddNewPatient = () => {
    // Add logic to handle adding a new patient
    if (selectedRecordId && phoneNumber) {
      createDoctorScheduleByPhoneNumber(selectedRecordId, phoneNumber, (res) => {
        if (res.status === 1) {
          notification.success({
            message: t(`Notification`),
            description: `Create schedule of patient successful.`,
            placement: `bottomRight`,
            duration: 1.5,
          });
          setIsModalVisible(false);
        } else {
          notification.error({
            message: t(`Notification`),
            description: `Create schedule of patient failed.`,
            placement: `bottomRight`,
            duration: 1.5,
          });
        }
      });
    } else {
      // Handle case when selectedRecordId or phoneNumber is not available
      notification.error({
        message: t(`Notification`),
        description: `Missing selected record ID or phone number.`,
        placement: `bottomRight`,
        duration: 1.5,
      });
    }
    console.log("Adding new patient with phone number:", phoneNumber);
    setIsModalVisible(false);
    setSearchedUser(null);
    setPhoneNumber("");
  };

  const handleRegisterClick = (schedule_id, patient_id) => {
    Modal.confirm({
      title: t(`Đăng ký lịch khám`),
      icon: <ExclamationCircleOutlined />,
      content: t(
        `You are going to register this schedule? Are you sure you want to do this? You can't reverse this`
      ),
      onOk() {
        const data = {
          "scheduleId": schedule_id,
          "patientId": patient_id,
        }
        createDoctorSchedule(data, (res) => {
          if (res.status === 1) {
            notification.success({
              message: t(`Notification`),
              description: `Create schedule of patient successful.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
            history.push(`/schedules/patient`);
          } else {
            notification.error({
              message: t(`Notification`),
              description: `Create schedule of patient failed.`,
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
  };

  const handleTableChange = (pagination, filters, sorter) => {
    let key = pagination.pageSize * (pagination.current - 1) + 1;
    getListSchedules(pagination, {}, {}, (res) => {
      if (res.status === 1) {
        res.data.schedule_list.forEach((schedule) => {
          schedule.key = key++;
        });

        setData(res.data.schedule_list);
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
    getListSchedules(pagination, {}, {}, (res) => {
      if (res.status === 1) {
        let key = 1;
        res.data.schedule_list.forEach((schedule) => {
          schedule.key = key++;
        });
        setData(res.data.schedule_list);
        setOriginalData(res.data.schedule_list);
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
        <Input.Search
          size="large"
          placeholder={t("Nhập tên bác sĩ")}
          enterButton
          onSearch={handleSearch}
        />
        <CCard>
          <CCardHeader>{t("List Schedules")} <p style={{ color: "gray", fontSize: "15px", textAlign: "right" }}>
            {t("*")} {t("Ca 1")}: 8h-10h, {t("Ca 2")}: 10h-12h, {t("Ca 3")}: 13h-15h, {t("Ca 4")}: 15h-17h
          </p></CCardHeader>
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
        <Modal
          title={t("Add New Patient")}
          visible={isModalVisible}
          onOk={handleAddNewPatient}
          onCancel={handleCancel}
        >
          <Form.Item label={t("Phone Number")}>
            <Input
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              onPressEnter={handleSearchUser}
            />
          </Form.Item>
          {searchedUser ? (
            <div>
              <p>{t("User found:")}</p>
              <p>{t("Name")}: {searchedUser.name}</p>
              <p>{t("Email")}: {searchedUser.email}</p>
              <p>{t("Phone")}: {searchedUser.phone}</p>
            </div>
          ) : (
            phoneNumber && <Button onClick={handleShowRegisterModal}>{t("Đăng ký user mới")}</Button>
          )}
        </Modal>
        <Modal
          title={t("Register New Patient")}
          visible={isRegisterModalVisible}
          onOk={handleAddNewPatient}
          onCancel={handleCancel}
        >
          {/* Form đăng ký thành viên mới */}
          <Form>
            <Form.Item label={t("Name")}>
              <Input
                value={registerModalData.name}
                onChange={(e) => setRegisterModalData({ ...registerModalData, name: e.target.value })}
              />
            </Form.Item>
            <Form.Item label={t("Email")}>
              <Input
                value={registerModalData.email}
                onChange={(e) => setRegisterModalData({ ...registerModalData, email: e.target.value })}
              />
            </Form.Item>
            <Form.Item label={t("Phone")}>
              <Input
                value={registerModalData.phone}
                onChange={(e) => setRegisterModalData({ ...registerModalData, phone: e.target.value })}
              />
            </Form.Item>
            {/* Thêm các trường dữ liệu khác cần thiết cho form đăng ký */}
          </Form>
        </Modal>
      </CCol>
    </CRow>
  );
};

export default withNamespaces()(ListSchedule);
