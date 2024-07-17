import React, { useEffect, useState } from "react";
import moment from "moment";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { Table, Tag, Space, notification, Button, Modal, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useHistory, Link } from "react-router-dom";
import { numberWithCommas } from "src/services/money";
import { withNamespaces } from "react-i18next";
import { pagination as pag } from "src/configs/Pagination";
import { getListInvoice, removeInvoice } from "src/services/invoice";
import { SearchOutlined } from "@ant-design/icons";
import removeDiacritics from 'remove-diacritics';


const ListInvoice = ({ match, t }) => {
  const [pagination, setPagination] = useState(pag);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  const statusOptions = [
    { text: 'Chưa thanh toán', value: 0 },
    { text: 'Đã thanh toán', value: 1 },
    { text: 'Đã hoàn', value: 2 },
    { text: 'Thanh toán không thành công', value: 3 },
  ];

  const columns = [
    {
      title: t("ID"),
      dataIndex: "key",
    },
    {
      title: t("Name"),
      dataIndex: "userName",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={t("Search Name")}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              {t("Search")}
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              {t("Reset")}
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => {
        return removeDiacritics(record.userName.toLowerCase()).includes(removeDiacritics(value.toLowerCase()));
      },
    },
    {
      title: t("Content"),
      dataIndex: "content",
    },
    {
      title: t("Amount"),
      dataIndex: "amount",
      render: (amount) => numberWithCommas(amount),
    },
    {
      title: t("Date"),
      dataIndex: "created_at",
      defaultSortOrder: 'descend',
      sorter: (a, b) => moment(a.created_at) - moment(b.created_at),
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
    {
      title: t("Status"),
      dataIndex: "status",
      filters: statusOptions,
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color, name;
        switch (status) {
          case 0:
            color = "gold";
            name = "Chưa thanh toán";
            break;
          case 1:
            color = "green";
            name = "Đã thanh toán";
            break;
          case 2:
            color = "red";
            name = "Đã hoàn";
            break;
          case 3:
            color = "orange";
            name = "Thanh toán không thành công";
            break;
          default:
            color = "default-color";
            name = "Unknown";
            break;
        }
        return <Tag color={color} key={name}>{name.toUpperCase()}</Tag>;
      },
    },
    {
      title: t("Action"),
      dataIndex: "_id",
      render: (_id, record) => (
        <Space size="middle">
          <Link to={`/invoice/${_id}`}>{t("Xem chi tiết")}</Link>
          {record.status === 2 && (
            <Button onClick={() => handleDeleteClick(_id)}>{t("Delete")}</Button>
          )}
        </Space>
      ),
    },
  ];

  const handleDeleteClick = (id) => {
    Modal.confirm({
      title: t(`Xóa hóa đơn`),
      icon: <ExclamationCircleOutlined />,
      content: t(`You are going to delete this invoice? Are you sure you want to do this? You can't reverse this`),
      onOk() {
        removeInvoice(id, (res) => {
          if (res.status === 1) {
            notification.success({
              message: t(`Notification`),
              description: `delete invoice successful.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
            window.location.reload();
          } else {
            notification.error({
              message: t(`Notification`),
              description: `delete invoice failed.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
          }
        });
      },
      onCancel() {
        notification.info({
          message: t(`Notification`),
          description: t(`Stop delete schedule of patient`),
          placement: `bottomRight`,
          duration: 1.5,
        });
      },
      centered: true,
    });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    fetchData(pagination, filters, sorter);
  };

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const fetchData = (pagination, filters, sorter) => {
    getListInvoice(pagination, filters, sorter, (res) => {
      if (res.status === 1) {
        let key = 1;
        res.data.invoice_list.forEach((invoice) => {
          invoice.key = key++;
        });
        setData(res.data.invoice_list);
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
  };

  useEffect(() => {
    fetchData(pagination, {}, {});
  }, []);

  return (
    <CRow className="position-relative">
      <CCol xs="12" md="12" className="mb-4 position-absolute">
        <CCard>
          <CCardHeader>{t("List Invoices")}</CCardHeader>
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

export default withNamespaces()(ListInvoice);