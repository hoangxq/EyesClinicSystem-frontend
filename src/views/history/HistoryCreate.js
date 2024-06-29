import React, { useEffect, useState } from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { DatePicker } from 'antd';
import {
    Button,
    Modal,
    Form,
    Input,
    notification,
    Upload,
    message
} from "antd";

import Roles from "src/configs/Roles";
// import Genders from "src/configs/Genders";
// import {
//     Validate
// } from 'src/configs';
import { createHistory } from "src/services/history";
import UpLoadImage from 'src/containers/UpLoadImage';
import {
    ExclamationCircleOutlined,
    UploadOutlined,
    // PlusSquareOutlined,
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


const HistoryCreate = ({ match, t }) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const [imageUrl, setImageUrl] = useState(null);
    useEffect(() => {
        console.log(Roles);
    }, []);
    const onFinish = (values) => {
        var submitData = {
            doctorScheduleId: match.params.schdeuleId,
            description: values.description,
            leftEye: values.leftEye,
            rightEye: values.rightEye,
            file: imageUrl
        };
        console.log('submit', submitData);
        Modal.confirm({
            title: t(`Create History`),
            icon: <ExclamationCircleOutlined />,
            content: t(
                `You are going to create this History? Are you sure you want to do this? You can't reverse this`
            ),
            onOk() {
                createHistory(submitData, (res) => {
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
    const handleImageUrlChange = (url) => {
        setImageUrl(url); // Hàm này sẽ được truyền vào UpLoadImage component để nhận URL của ảnh đã tải lên
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
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập tình trạng hiện tại!",
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    placeholder="Vui lòng nhập tình trạng hiện tại của bệnh nhân!"
                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                    style={{ height: "200px", fontSize: "16px" }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={t("Left Eye")}
                                labelAlign="left"
                                name="leftEye"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập tình trạng mắt trái!",
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    placeholder="Vui lòng nhập tình trạng mắt trái!"
                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                    style={{ height: "200px", fontSize: "16px" }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={t("Right Eye")}
                                labelAlign="left"
                                name="rightEye"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập tình trạng mắt phải!",
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                    style={{ height: "200px", fontSize: "16px" }}
                                    placeholder="Vui lòng nhập tình trạng mắt phải!"
                                />
                            </Form.Item>
                            <Form.Item
                                label={t("File")}
                                labelAlign="left"
                                name="file"
                                rules={[
                                    {
                                        required: false,
                                        message: "Vui lòng thêm file kết quả đo mắt!",
                                    },
                                ]}
                            >
                                {/* <Upload
                                    name="file"
                                    beforeUpload={() => false} // Prevent automatic upload
                                    onChange={(info) => {
                                        if (info.file.status === 'done') {
                                            if (info.file.response && info.file.response.status === 1) {
                                                // Lấy đường dẫn của file từ response khi upload thành công
                                                const filePath = info.file.response.data.file_path;
                                                console.log('File uploaded:', filePath);
                                            } else {
                                                message.error('Upload failed.');
                                            }
                                        } else if (info.file.status === 'error') {
                                            message.error(`${info.file.name} upload failed.`);
                                        }
                                    }}
                                    action="/" 
                                >
                                    <Button icon={<UploadOutlined />}>Select File</Button>
                                </Upload> */}
                                <UpLoadImage onUploadComplete={handleImageUrlChange} />

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
}

export default withNamespaces()(HistoryCreate);