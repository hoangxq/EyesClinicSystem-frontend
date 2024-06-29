import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import {
  // Button,
  Descriptions,
  notification,
} from "antd";
import {
  getProfile,
  // generateCode
} from "src/services/user";
import { useSelector } from "react-redux";
import { withNamespaces } from "react-i18next";
import { Status } from "src/configs";
import moment from "moment";

const Profile = ({ t }) => {
  const [userData, setUserData] = useState();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    getProfile(user.data._id, (res) => {
      console.log('test1',res)


      if (res.status === 1) {
        setUserData(res.data.info);
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

  console.log('test',user.data)


  console.log('test',userData)

  return (
    <>
      <CRow className="justify-content-center">
        <CCol xs="12" sm="6">
          <CCard>
            <CCardBody>
              {userData ? (
                <Descriptions title={t("User's Info")} bordered>
                  <Descriptions.Item label={t("Tên")} span={3}>
                    {userData.name}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("Phone")} span={3}>
                    {userData.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("Role")} span={3}>
                    {userData.role}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("Địa chỉ")} span={3}>
                    {userData.address}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("Created At")} span={3}>
                    {moment(userData.created_at).format("HH:mm DD-MM-YYYY")}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("Updated At")} span={3}>
                    {moment(userData.updated_at).format("HH:mm DD-MM-YYYY")}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("Status")} span={3}>
                    {userData.status === Status.ACTIVE.id
                      ? t(Status.ACTIVE.name)
                      : userData.status === Status.INACTIVE.id
                      ? t(Status.INACTIVE.name)
                      : t(Status.BLOCK.name)}
                  </Descriptions.Item>
                </Descriptions>
              ) : null}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default withNamespaces()(Profile);
