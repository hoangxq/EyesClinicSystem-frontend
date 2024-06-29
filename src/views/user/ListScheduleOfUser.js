import React, { useEffect, useState } from "react";
import moment from "moment";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { notification } from "antd";
import { useHistory } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { getListSchedulesOfUser } from "src/services/schedule";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const ListScheduleOfUser = ({ t }) => {
  const [events, setEvents] = useState([]);
  const storedUser = localStorage.getItem('eyesclinicsystem_user') || null;
  const user = JSON.parse(storedUser) || null;
  const userId = user?._id;
  const history = useHistory();

  
  useEffect(() => {
    getListSchedulesOfUser(userId, {}, {}, {}, (res) => {
      if (res.status === 1) {
        const newEvents = res.data.schedule_list.map(schedule => ({
          id: schedule._id,
          title: `${schedule.doctor_name} - ${schedule.timeType_name}`, 
          start: moment(schedule.date).format("YYYY-MM-DD"),
        }));
        setEvents(newEvents);
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
    <CRow className="position-relative">
      <CCol xs="12" md="12" className="mb-4 position-absolute">
        <CCard>
          <CCardHeader>{t("List Schedules")}</CCardHeader>
          <CCardBody>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
              eventClick={(info) => {
                const scheduleId = info.event.id;
                history.push(`/schedules/${scheduleId}`);
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default withNamespaces()(ListScheduleOfUser);

