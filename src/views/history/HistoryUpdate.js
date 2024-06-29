import React, { useEffect, useState } from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { DatePicker } from 'antd';
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
    message
} from "antd";

import Roles from "src/configs/Roles";
import Genders from "src/configs/Genders";
import {
    Validate
} from 'src/configs';
import { updateHistory, getHistory } from "src/services/history";
import {
    ExclamationCircleOutlined,
    UploadOutlined,
    PlusSquareOutlined,
} from "@ant-design/icons";
import { withNamespaces } from "react-i18next";
import { useHistory,  } from "react-router";
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
const HistoryUpdate = ({ match, t }) => {
    const [form] = Form.useForm();
    const [data, setData] = useState();
    const history = useHistory();

    useEffect(() => {
        getHistory(match.params.schdeuleId, (res) => {
          if (res.status === 1) {
            setData(res.data.data);
            console.log('test1',data)
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
    const onFinish = (values) => {
        var submitData = {
            doctorScheduleId: match.params.schdeuleId,
            result: values.result,
            prescription: values.prescription,
        };
        console.log('submit', submitData);
        Modal.confirm({
            title: t(`Create History`),
            icon: <ExclamationCircleOutlined />,
            content: t(
                `You are going to create this History? Are you sure you want to do this? You can't reverse this`
            ),
            onOk() {
                updateHistory(submitData, (res) => {
                    console.log(res)
                    if (res.status === 1) {
                        notification.success({
                            message: t(`Notification`),
                            description: `Create sale successful.`,
                            placement: `bottomRight`,
                            duration: 1.5,
                        });
                        // setIsFinalUpdate(true)
                        history.goBack();
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
                    description: t(`Stop create History`),
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
                        {t("Đo mắt")}
                    </CCardHeader>
                    <CCardBody>
                        <Form form={form} {...formItemLayout} onFinish={onFinish}>
                            <Form.Item
                                label={t("Description")}
                                labelAlign="left"
                            >
                                {data ? <span>{data.description}</span> : <span>{t("EMPTY")}</span>}
                            </Form.Item>
                            <Form.Item
                                label={t("Left Eyse")}
                                labelAlign="left"
                            >
                                {data ? <span>{data.leftEye}</span> : <span>{t("EMPTY")}</span>}
                            </Form.Item>
                            <Form.Item
                                label={t("Right Eye")}
                                labelAlign="left"
                            >
                                {data ? <span>{data.rightEye}</span> : <span>{t("EMPTY")}</span>}
                            </Form.Item>
                            <Form.Item
                                label={t("Result")}
                                labelAlign="left"
                                name="result"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập kết quả chẩn đoán!",
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    placeholder="Vui lòng nhập kết quả chẩn đoán của bệnh nhân!"
                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                    style={{ height: "200px", fontSize: "16px" }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={t("Prescription")}
                                labelAlign="left"
                                name="prescription"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập đơn thuốci!",
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    placeholder="Vui lòng nhập đơn thuôc!"
                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                    style={{ height: "200px", fontSize: "16px" }}
                                />
                            </Form.Item>


                            <Button type="primary" block htmlType="submit">
                                {t("Update")}
                            </Button>
                        </Form>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

export default withNamespaces()(HistoryUpdate);