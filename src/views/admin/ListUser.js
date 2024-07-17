// import React, { useEffect, useState } from "react";
// import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
// import {
//   Table,
//   Tag,
//   Space,
//   notification,
//   // Avatar
// } from "antd";
// import { Notification, Roles, Status, Type } from "src/configs";
// import { Link } from "react-router-dom";
// // import moment from 'moment';
// // import { useSelector } from 'react-redux';
// import { getListUsers } from "src/services/user";
// import { withNamespaces } from "react-i18next";
// // import socket from 'src/socket';

// const ListUsers = ({ t }) => {
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 100,
//   });
//   const [data, setData] = useState();

//   const columns = [
//     {
//       title: t("ID"),
//       dataIndex: "key",
//     },
//     {
//         title: t('Name'),
//         dataIndex: 'name',
//         render: name => <>{name}</>,
//     },
//     {
//       title: t("Phone"),
//       dataIndex: "phone",
//       render: (phone) => <>{phone}</>,
//     },
//     {
//       title: t("Type"),
//       dataIndex: "role",
//       render: (role) => <>{role}</>,
//     },
//     {
//       title: t("Status"),
//       dataIndex: "status",
//       render: (status) => {
//         let color;
//         let name;
//         if (status === Status.ACTIVE.id) {
//           color = "green";
//           name = Status.ACTIVE.name;
//         } else if (status === Status.BLOCK.id) {
//           color = "volcano";
//           name = Status.BLOCK.name;
//         }

//         return (
//           <>
//             <Tag color={color} key={name}>
//               {name.toUpperCase()}
//             </Tag>
//           </>
//         );
//       },
//       // filters: statusFilter,
//       // filteredValue: statusFilterValue
//     },
//     {
//       title: t("Action"),
//       dataIndex: "_id",
//       render: (_id) => {
//         return (
//           <>
//             <Space size="middle">
//               <Link to={`/users/${_id}`}>{t("Detail")}</Link>
//             </Space>
//           </>
//         );
//       },
//     },
//   ];

//   const handleTableChange = (pagination, filters, sorter) => {
//     let key = pagination.pageSize * (pagination.current - 1) + 1;
//     getListUsers(pagination, {}, {}, (res) => {
//       if (res.status === 1) {
//         // let key = 1;
//         res.data.user_list.forEach((user) => {
//           user.key = key++;
//         });

//         setData(res.data.user_list);
//         setPagination({ ...pagination, total: res.metadata.total });
//       } else if (res.status === 403) {
//         notification.error({
//           message: t(`Notification`),
//           description: `${res.message + " " + res.expiredAt}`,
//           placement: `bottomRight`,
//           duration: 10,
//         });
//       } else {
//         notification.error({
//           message: t(`Notification`),
//           description: `${res.message}`,
//           placement: `bottomRight`,
//           duration: 1.5,
//         });
//       }
//     });
//   };

//   useEffect(() => {
//     getListUsers(pagination, {}, {}, (res) => {
//       if (res.status === 1) {
//         let key = 1;
//         res.data.user_list.forEach((user) => {
//           user.key = key++;
//         });

//         setData(res.data.user_list);
//         setPagination({ ...pagination, total: res.metadata.total });
//       } else if (res.status === 403) {
//         notification.error({
//           message: t(`Notification`),
//           description: `${res.message + " " + res.expiredAt}`,
//           placement: `bottomRight`,
//           duration: 10,
//         });
//       } else {
//         notification.error({
//           message: t(`Notification`),
//           description: `${res.message}`,
//           placement: `bottomRight`,
//           duration: 1.5,
//         });
//       }
//     });
//   }, []);
//   return (
//     <CRow>
//       <CCol xs="12" md="12" className="mb-4">
//         <CCard>
//           <CCardHeader>{t("List Users")}</CCardHeader>
//           <CCardBody>
//             <Table
//               className="overflow-auto"
//               columns={columns}
//               dataSource={data}
//               pagination={pagination}
//               onChange={handleTableChange}
//             />
//           </CCardBody>
//         </CCard>
//       </CCol>
//     </CRow>
//   );
// };

// export default withNamespaces()(ListUsers);

import React, { useEffect, useState } from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import {
  Table,
  Tag,
  Space,
  notification,
} from "antd";
import { Notification, Roles, Status, Type } from "src/configs";
import { Link } from "react-router-dom";
import { getListUsers } from "src/services/user";
import { withNamespaces } from "react-i18next";


const ListUsers = ({ t }) => {
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
      title: t("Phone"),
      dataIndex: "phone",
      render: (phone) => <>{phone}</>,
    },
    {
      title: t("Type"),
      dataIndex: "role",
      render: (role) => <>{role}</>,
    },
    {
      title: t("Status"),
      dataIndex: "status",
      render: (status) => {
        let color;
        let name;
        if (status === Status.ACTIVE.id) {
          color = "green";
          name = Status.ACTIVE.name;
        } else if (status === Status.BLOCK.id) {
          color = "volcano";
          name = Status.BLOCK.name;
        }

        return (
          <>
            <Tag color={color} key={name}>
              {name.toUpperCase()}
            </Tag>
          </>
        );
      },
      // filters: statusFilter,
      // filteredValue: statusFilterValue
    },
    {
      title: t("Action"),
      dataIndex: "_id",
      render: (_id) => {
        return (
          <>
            <Space size="middle">
              <Link to={`/users/${_id}`}>{t("Detail")}</Link>
            </Space>
          </>
        );
      },
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    let key = pagination.pageSize * (pagination.current - 1) + 1;
    getListUsers(pagination, {}, {}, (res) => {
      if (res.status === 1) {
        // let key = 1;
        res.data.user_list.forEach((user) => {
          user.key = key++;
        });

        setData(res.data.user_list);
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
    getListUsers(pagination, {}, {}, (res) => {
      if (res.status === 1) {
        let key = 1;
        res.data.user_list.forEach((user) => {
          user.key = key++;
        });

        setData(res.data.user_list);
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
          <CCardHeader>{t("List Users")}</CCardHeader>
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

export default withNamespaces()(ListUsers);