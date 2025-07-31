// import React, { useState, useEffect } from "react";
// import { Table } from "react-bootstrap";
// import axios from "axios";

// const ShowUsers = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/v1/user")  // Your GET all users endpoint here
//       .then(res => {
//         // Adjust if your backend returns users inside a property like 'users'
//         setUsers(res.data.user || []);  
//       })
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="p-4">
//       <h4>All Users</h4>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Username</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u, index) => (
//             <tr key={u.userId}>
//               <td>{index + 1}</td>
//               <td>{u.username}</td>
//               <td>{u.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default ShowUsers;
// // This code defines a React component that fetches and displays a list of users from a backend API.
// // It uses React Bootstrap for styling the table and Axios for making HTTP requests.  
// // The component fetches user data when it mounts and displays it in a table format, including the user's ID, username, and email address.
