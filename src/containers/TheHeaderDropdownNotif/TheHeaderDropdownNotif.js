import React, { useState, useEffect } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
} from "@coreui/react";
import { Tabs } from "antd";
import CIcon from "@coreui/icons-react";
import io from "socket.io-client";
import { Roles } from "src/configs";
// import { withNamespaces } from "react-i18next";
import classes from "./TheHeaderDropdownNotif.module.css";
import { notification } from "antd";
import { useHistory, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { updateListNotification } from "src/actions/notification";
import sockets from "src/socket";
import { updateNotifications } from "src/services/notification";
const TheHeaderDropdownNotif = ({ t }) => {
  const user = useSelector((state) => state.user);
  const [notifyCount, setNotifyCount] = useState(0);
  const [notifyAirportCount, setNotifyAirportCount] = useState(0);
  const [statusNotif, setStatusNotif] = useState(1);
  const [refresh, setRefresh] = useState(-1)
  const history = useHistory();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]); //Dung de display order
  const [orderAirports, setOrderAirports] = useState([]);
  // let socket;
  // if (user.data.role != Roles.ADMIN) {
  //   socket = sockets.init(user.data._id, user.data.role);
  // }
  // let current_order;
  // let current_order_airport;
  // let formData;
  const notifyBell =
    notifyCount > 1
      ? t(`You have`) +
        " " +
        (notifyCount + notifyAirportCount) +
        " " +
        t(`notifications`)
      : t(`You have`) +
        " " +
        (notifyCount + notifyAirportCount) +
        " " +
        t(`notification`);

  useEffect(() => {
  }, []);
  const detailNotification = (e) => {
    const notification_id = e.target.getAttribute("data-value");
    if (statusNotif == 1) {
      setNotifyCount((order) => (order = order - 1));
      setOrders((orders) =>
        orders.filter((order) => order._id !== notification_id)
      );

      const order_id = e.target.getAttribute("data-key");
      updateNotifications(notification_id, (res) => {
        if (res.status === 1) {
          history.push(`/orders/${order_id}`);
        }
      });
    }
    if (statusNotif == 2) {
      setNotifyAirportCount((order) => (order = order - 1));
      setOrderAirports((orders) =>
        orders.filter((order) => order._id !== notification_id)
      );
      
      const order_airport_id = e.target.getAttribute("data-key");
      updateNotifications(notification_id, (res) => {
        if (res.status === 1) {
          history.push(`/order-airports/${order_airport_id}`);
        }
      });
    }
  };
  const changeStatusNotif = (key) => {
    setStatusNotif(key);
  };
  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" />
        {notifyCount + notifyAirportCount > 0 && (
          <CBadge shape="pill" color="danger">
            {notifyCount + notifyAirportCount}
          </CBadge>
        )}
      </CDropdownToggle>
      <CDropdownMenu
        placement="bottom-end"
        // className="pt-0"
        className={classes.menu}
      >
        <CDropdownItem
          header
          tag="div"
          // className="text-center"
          color="light"
          className={classes.item}
        >
          <strong>{notifyBell}</strong>
        </CDropdownItem>
        <CDropdownItem
          tag="div"
          // className="text-center"
          color="light"
          className={classes.item1}
        >
          <Tabs
            defaultActiveKey="1"
            style={{ margin: "10px", width: "100%", padding: "0px" }}
            onChange={changeStatusNotif}
          >
            <Tabs.TabPane
              // style={{ margin: 0, padding: "10px" }}
              tab={t("Thông báo chung") + ` (${notifyCount})`}
              key="1"
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={t("Thông báo cá nhân") + ` (${notifyAirportCount})`}
              key="2"
            ></Tabs.TabPane>
          </Tabs>
        </CDropdownItem>
        {statusNotif == 1 &&
          orders &&
          orders.map((order) => (
            <CDropdownItem
              data-key={order.data.order_id}
              key={order._id}
              data-value={order._id}
              className={classes.item}
              onClick={(e) => detailNotification(e)}
            >
              <CIcon name="cil-chart-pie" className="mr-2 text-info" />{" "}
              {order.title}
            </CDropdownItem>
          ))}
        {statusNotif == 2 &&
          orderAirports &&
          orderAirports.map((order) => (
            <CDropdownItem
              data-key={order.data.order_airport_id}
              key={order._id}
              data-value={order._id}
              className={classes.item}
              onClick={(e) => detailNotification(e)}
            >
              <CIcon name="cil-chart-pie" className="mr-2 text-info" />{" "}
              {order.title}
            </CDropdownItem>
          ))}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownNotif;
