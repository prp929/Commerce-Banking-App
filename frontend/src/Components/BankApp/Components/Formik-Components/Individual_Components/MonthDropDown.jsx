// import { useEffect, useState } from "react";


// const monthOptions = [
//   { value: 'January', label: 'January' },
//   { value: 'February', label: 'February' },
//   { value: 'March', label: 'March' },
//   { value: 'April', label: 'April' },
//   { value: 'May', label: 'May' },
//   { value: 'June', label: 'June' },
//   { value: 'July', label: 'July' },
//   { value: 'August', label: 'August' },
//   { value: 'September', label: 'September' },
//   { value: 'October', label: 'October' },
//   { value: 'November', label: 'November' },
//   { value: 'December', label: 'December' },
// ];

// export default function MonthDropdown({mon}) {
//   const [selectedMonth, setSelectedMonth] = useState((new Date()).getMonth() );

//   handleSelectMonth = (e) => {
//     setSelectedMonth(e.target.value);
//     mon = e.target.value;
//   };

//   return (
//     <div>
//       <label htmlFor="monthSelect">Select a month:</label>
//       <select
//         id="monthSelect"
//         name="monthSelect"
//         value={selectedMonth}
//         onChange={handleSelectMonth}
//       >
//         <option value="">Choose a month</option>
//         {monthOptions.map((month) => (
//           <option key={month.value} value={month.value}>
//             {month.label}
//           </option>
//         ))}
//       </select>
//       {selectedMonth && <p>You selected {selectedMonth}!</p>}
//     </div>
//   );
// }
