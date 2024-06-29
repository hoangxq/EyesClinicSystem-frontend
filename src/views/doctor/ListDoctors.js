import React, { useEffect, useState } from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import {
  Table,
  Tag,
  Space,
  notification,
  // Avatar
} from "antd";
import { Notification, Roles, Status, Type } from "src/configs";
import { Link } from "react-router-dom";
// import moment from 'moment';
// import { useSelector } from 'react-redux';
import { getListDoctors } from "src/services/doctor";
import { withNamespaces } from "react-i18next";
// import socket from 'src/socket';

const ListDoctors = ({ t }) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  });
  const [data, setData] = useState();

  const columns = [
    {
      title: t("ID"),
      dataIndex: "key",
    },
    {
        title: t('Name'),
        dataIndex: 'name',
        render: name => <>{name}</>,
    },
    {
      title: t("Hospital"),
      dataIndex: "hospital",
      render: (hospital) => <>{hospital}</>,
      // filters: provinceFilter,
    },
    {
      title: t("Age"),
      dataIndex: "age",
      render: (age) => <>{age}</>,
    },
    {
      title: t("Action"),
      dataIndex: "_id",
      render: (_id) => {
        return (
          <>
            <Space size="middle">
              <Link to={`/doctors/${_id}`}>{t("Detail")}</Link>
            </Space>
          </>
        );
      },
    },
    {
      title: t("Lịch khám"),
      dataIndex: "_id",
      render: (_id) => {
        return (
          <>
            <Space size="middle">
              <Link to={`/schedules/doctor/${_id}`}>{t("Xem lịch khám")}</Link>
            </Space>
          </>
        );
      },
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    let key = pagination.pageSize * (pagination.current - 1) + 1;
    getListDoctors(pagination, {}, {}, (res) => {
      if (res.status === 1) {
        // let key = 1;
        res.data.doctor_list.forEach((doctor) => {
          doctor.key = key++;
        });

        setData(res.data.doctor_list);
        setPagination({ ...pagination, total: res.metadata.total });
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
  };

  useEffect(() => {
    getListDoctors(pagination, {}, {}, (res) => {
      if (res.status === 1) {
        let key = 1;
        res.data.doctor_list.forEach((doctor) => {
          doctor.key = key++;
        });

        setData(res.data.doctor_list);
        setPagination({ ...pagination, total: res.metadata.total });
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
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>{t("List Doctors")}</CCardHeader>
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
    </CRow>
  );
};

export default withNamespaces()(ListDoctors);
