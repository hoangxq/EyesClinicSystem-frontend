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
import { getHistory } from "src/services/history";

const HistoryDetail = ({ match, t }) => {
  const [data, setData] = useState();



  useEffect(() => {
    getHistory(match.params.schdeuleId, (res) => {
      if (res.status === 1) {
        setData(res.data.data);
        console.log('test1', data)
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
    <>
      <CRow className="justify-content-center">
        <CCol xs="12" sm="6">
          <CCard>
            <CCardBody>
              {data ? (
                <Descriptions title={t("Lịch sử khám")} bordered>
                  <Descriptions.Item label={t("Left Eye")} span={3}>
                    {data.leftEye}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("Right Eye")} span={3}>
                    {data.rightEye}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("Detail")} span={3} >
                    <a href={data.file} target="_blank" rel="noopener noreferrer">
                      {data.file}
                    </a>
                  </Descriptions.Item>
                  <Descriptions.Item label={t("Result")} span={3}>
                    {data.result}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("Prescription")} span={3}>
                    {data.prescription}
                  </Descriptions.Item>

                  <Descriptions.Item label={t("Created At")} span={3}>
                    {moment(data.created_at).format("HH:mm DD-MM-YYYY")}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("Updated At")} span={3}>
                    {moment(data.updated_at).format("HH:mm DD-MM-YYYY")}
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

export default withNamespaces()(HistoryDetail);
