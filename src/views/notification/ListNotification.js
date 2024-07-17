import React, { useEffect, useState } from 'react';
import { List, Avatar, Button, notification, Typography, Modal, Space } from 'antd';
import moment from 'moment';
import { getAllNotification } from 'src/services/notification'; // Import getAllNotification

const { Text } = Typography;

const ListNotification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const storedUser = localStorage.getItem('eyesclinicsystem_user') || null;
    const user = JSON.parse(storedUser) || null;
    const userId = user?._id;
    const userRole = user?.role;

    const fetchNotifications = async () => {
        setLoading(true);
        getAllNotification((response) => {
            if (response && response.data) {
                // Sort notifications by date descending
                const sortedNotifications = response.data.data.sort((a, b) => moment(b.created_at) - moment(a.created_at));
                setNotifications(sortedNotifications);
                notification.success({
                    message: 'Success',
                    description: 'Notifications fetched successfully',
                });
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Failed to fetch notifications',
                });
            }
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const showDetail = (notification) => {
        setSelectedNotification(notification);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setSelectedNotification(null);
        setSelectedImage(null); // Clear selected image on modal close
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    return (
        <>
            <List
                loading={loading}
                itemLayout="vertical"
                size="large"
                dataSource={notifications}
                renderItem={item => (
                    <List.Item
                        key={item._id}
                        style={{ marginBottom: '40px', border: '1px solid #e8e8e8', borderRadius: '5px', padding: '15px' }}
                        actions={[
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                <Button style={{fontFamily: 'sans-serif', fontSize : '15px' }} type="link" onClick={() => showDetail(item)}>Xem chi tiết</Button>
                                {userRole === 'ADMIN' && (
                                    <Button style={{fontFamily: 'sans-serif', fontSize : '15px'  }} type="link" danger>Delete</Button>
                                )}
                            </div>
                        ]}
                        extra={
                            <>
                                <Text type="secondary">{moment(item.created_at).fromNow()}</Text>
                                <div style={{ marginTop: '10px' }}>
                                    <img
                                        width={100}
                                        alt="logo"
                                        src={item.photo || "https://via.placeholder.com/100"}
                                        style={{ borderRadius: 10, cursor: 'pointer' }}
                                        onClick={() => handleImageClick(item.photo)}
                                    />
                                </div>
                            </>
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.image || "https://via.placeholder.com/40"} />}
                            title={<Text strong style={{fontSize: '20px'}}>{item.title}</Text>}
                            description={<Text strong>{item.content}</Text>}
                        />
                    </List.Item>
                )}
            />
            {selectedNotification && (
                <Modal
                    title={selectedNotification.title}
                    visible={modalVisible}
                    onCancel={handleModalClose}
                    footer={[
                        <Button key="close" onClick={handleModalClose}>
                            Close
                        </Button>
                    ]}
                >
                    <p>{selectedNotification.content}</p>
                    {selectedNotification.photo && (
                        <img
                            src={selectedNotification.photo}
                            alt="Notification"
                            style={{ width: '100%', marginTop: '20px', cursor: 'pointer' }}
                            onClick={() => handleImageClick(selectedNotification.photo)}
                        />
                    )}
                    {selectedImage && (
                        <Modal
                            visible={selectedImage !== null}
                            onCancel={() => setSelectedImage(null)}
                            footer={null}
                            width={800}
                            bodyStyle={{ textAlign: 'center' }}
                        >
                            <img
                                src={selectedImage}
                                alt="Zoomed Notification"
                                style={{ maxWidth: '100%', maxHeight: '80vh' }}
                            />
                        </Modal>
                    )}
                </Modal>
            )}
        </>
    );
};

export default ListNotification;
