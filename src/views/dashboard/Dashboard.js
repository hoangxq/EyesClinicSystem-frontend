// import React, { useEffect, useState } from 'react'
// import { getListQuotation } from 'src/services/quotation';
// import { notification } from "antd";

// import { useSelector } from "react-redux"

// import { Roles } from "../../configs";


// const Dashboard = ({ t }) => {
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 100000,
//   });
//   const [data, setData] = useState();
//   let service_no1 = 0, service_no2 = 0;

//   useEffect(() => {
//     role === Roles.ANALYST && getListQuotation(pagination, {}, {}, (res) => {
//       if (res.status === 1) {
//         setData(res.data.quotation_list)
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
//     },[])
//   },[])

//   let max = 0
//   let distances = new Array(10000).fill(0)
//   let timeDistances = new Array(10000)
//   let days = new Array()
//   let index = 0

//   //time subtraction
//   data && data.forEach((quotation) => {
//     quotation.service_id === 1 ? service_no1++ : service_no2++;
//     const time = quotation.pickup_time
//     let pickup = `${time.slice(12,16)}-${time.slice(9, 11)}-${time.slice(6,8)}T${time.slice(0,5)}`
//     let distance = Math.ceil(((Date.parse(pickup) - Date.parse(quotation.created_at.slice(0,16)))/86400000))
    
//     distance = distance<1 ? 1 : distance

//     distances[distance] ++
//     max = Math.max(distance, max)
//   });

//   distances = distances.slice(1, max + 1)

//   for(let i=0; i<distances.length; i++) {
//     if(distances[i] > 0) {
//       timeDistances[index] = distances[i]
//       days[index] = `${i+1} days`
//       index++
//     }
//   }  

//   const role = useSelector((state) => state.user?.data.role);
//   return (
//     <div className='chart'>
//       {role === Roles.ANALYST && <div className="pie_chart">
//       </div>}
//     </div>
//   );
// }

// export default Dashboard
