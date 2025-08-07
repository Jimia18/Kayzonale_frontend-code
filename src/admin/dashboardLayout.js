// // dashboardLayout.jsx
// import React from "react";
// import { Container, Navbar, Button } from "react-bootstrap";

// const DashboardLayout = ({
//   title,
//   description,
//   children,
//   sidebarOpen,
//   setSidebarOpen,
//   isMobile,
//   SidebarComponent,
// }) => {
//   return (
//     <div className="d-flex">
//       {/* Sidebar here */}
//       {SidebarComponent && (
//         <SidebarComponent
//           show={sidebarOpen}
//           onHide={() => setSidebarOpen(false)}
//           isMobile={isMobile}
//         />
//       )}

//       {/* Main Content */}
//       <div className="flex-grow-1" style={{ marginLeft: isMobile ? 0 : 250 }}>
//         <Navbar
//           bg="light"
//           expand="lg"
//           className="px-3 shadow-sm d-flex justify-content-between"
//         >
//           <h4 className="my-2">{title}</h4>
//           {isMobile && (
//             <Button
//               variant="outline-secondary"
//               onClick={() => setSidebarOpen(true)}
//             >
//               ☰
//             </Button>
//           )}
//         </Navbar>
//         <Container className="py-4">
//           <p className="text-muted">{description}</p>
//           {children}
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


// src/admin/dashboardLayout.jsx
import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";

const DashboardLayout = ({
  title,
  description,
  children,
  sidebarOpen,
  setSidebarOpen,
  isMobile,
  SidebarComponent,
}) => {
  return (
    <div className="d-flex">
      {/* FIXED SIDEBAR */}
      <div
        className={`bg-light ${
          isMobile ? (sidebarOpen ? "d-block" : "d-none") : "d-block"
        }`}
        style={{
          width: 250,
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          overflowY: "auto",
          zIndex: 1040,
          borderRight: "1px solid #ddd",
        }}
      >
        {SidebarComponent && (
          <SidebarComponent
            show={sidebarOpen}
            onHide={() => setSidebarOpen(false)}
            isMobile={isMobile}
          />
        )}
      </div>

      {/* MAIN CONTENT */}
      <div
        className="flex-grow-1"
        style={{ marginLeft: isMobile ? 0 : 250 }}
      >
        <Navbar
          bg="light"
          expand="lg"
          className="px-3 shadow-sm d-flex justify-content-between"
        >
          <h4 className="my-2">{title}</h4>
          {isMobile && (
            <Button
              variant="outline-secondary"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </Button>
          )}
        </Navbar>
        <Container className="py-4">
          <p className="text-muted">{description}</p>
          {children}
        </Container>
      </div>
    </div>
  );
};

export default DashboardLayout;

