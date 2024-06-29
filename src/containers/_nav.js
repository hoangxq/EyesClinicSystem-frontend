import React from "react";
import CIcon from "@coreui/icons-react";
import { Roles } from "src/configs";


const storedUser = localStorage.getItem('eyesclinicsystem_user') || null;
const user = storedUser ? JSON.parse(storedUser) : null;
const userRole = user?.role || null;
const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Users",
    icon: "cil-people",
    permission: [Roles.ADMIN],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "List Users",
        to: "/users",
        permission: [Roles.ADMIN],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Add User",
        to: "/users/create",
        permission: [Roles.ADMIN],
      },
    ],
  },
  ...(userRole !== 'SALE' ? [{
    _tag: "CSidebarNavDropdown",
    name: "Bác sĩ",
    icon: "cil-user",
    // permission: [Roles.ADMIN, Roles.PATIENT, Roles.NURSE, Roles.DOCTOR],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Danh sách bác sĩ",
        to: "/doctors",
        // permission: [Roles.ADMIN, Roles.PATIENT, Roles.NURSE, Roles.DOCTOR],
      }
    ],
  }] : []),
  ...(userRole !== 'SALE' ? [{
    _tag: 'CSidebarNavDropdown',
    name: 'Lịch khám',
    icon: 'cil-calendar',
    _children: [
      ...(userRole !== 'PATIENT' ? [{
        _tag: 'CSidebarNavItem',
        name: 'Danh sách lịch làm việc',
        to: '/all-schedules-of-doctors',
        permission: [Roles.ADMIN, Roles.NURSE, Roles.DOCTOR, Roles.RECEPTIONIST],
      }] : []),
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh sách lịch làm việc',
        to: '/patient/all-schedules-of-doctors',
        permission: [Roles.PATIENT],
      },
      ...(userRole === null ? [{
        _tag: 'CSidebarNavItem',
        name: 'Danh sách lịch làm việc',
        to: '/patient/all-schedules-of-doctors',
        // permission: [Roles.PATIENT],
      }] : []),
      {
        _tag: 'CSidebarNavItem',
        name: 'Lịch làm việc',
        to: `/schedule/user`,
        permission: [Roles.DOCTOR],
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Đăng ký lịch làm việc',
        to: '/schedules/create',
        permission: [Roles.DOCTOR],
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Lịch khám đã đăng ký',
        to: '/schedules/patient/',
        permission: [Roles.PATIENT],
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Lịch khám đã đăng ký',
        to: '/doctor_schedules',
        permission: [Roles.ADMIN, Roles.RECEPTIONIST, Roles.NURSE],
      },
    ],
  }] : []),
  {
    _tag: "CSidebarNavDropdown",
    name: "Notification",
    icon: "cil-bell",
    // permission: [Roles.ADMIN],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "List notifications",
        to: "/notification/all-noti",
        // permission: [Roles.ADMIN],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Add notification",
        to: "/notification/create",
        permission: [Roles.ADMIN],
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Invoice",
    icon: "cil-cash",
    permission: [Roles.ADMIN,Roles.PATIENT, Roles.SALE],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "List Invoice",
        to: "/invoice/patient",
        permission: [Roles.PATIENT],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Create New Invoice",
        to: "/invoice/new/create",
        permission: [Roles.ADMIN, Roles.SALE],
      },
      {
        _tag: "CSidebarNavItem",
        name: "List Invoice",
        to: "/invoice",
        permission: [Roles.ADMIN, Roles.SALE],
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Product",
    icon: "cil-cash",
    permission: [Roles.ADMIN, Roles.SALE],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "List Product",
        to: "/all-products",
        permission: [Roles.ADMIN, Roles.SALE],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Create New Product",
        to: "/product/create",
        permission: [Roles.ADMIN, Roles.SALE],
      },
    ],
  },
];



export default _nav;
