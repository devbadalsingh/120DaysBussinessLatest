
import React, { useEffect } from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom';
// import useAuthStore from './store/authStore';
import Sidebar from '../Navbar/Sidebar';
import Navbar from '../Navbar/Navbar';
import GlobalBox from './GlobalBox';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { tokens } from '../theme';
import useAuthStore from './store/authStore';
import useStore from '../Store';
import Header from "./Header";
// import {useGetEmployeesQuery, useGetLeadTotalRecordsQuery , useGetTotalRecordsForSupervisorQuery} from '../Service/Query';
// import { WindowOutlined } from '@mui/icons-material';
const Dashboard = ({ isSidebarOpen }) => {
  const { login, setEmployeeDetails } = useStore();
  const { empInfo,activeRole } = useAuthStore();
  const navigate = useNavigate(); // React Router hook for navigation
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const { data: employeeDetails, isSuccess: empDetailsSuccess, refetch } = useGetEmployeesQuery();
  // const { data}  = useGetLeadTotalRecordsQuery();
  // const { data: supData, isSuccess: supSuccess } = useGetTotalRecordsForSupervisorQuery();

  console.log("The active log is ",activeRole);

   // Define Employee roles with icons and paths
   const Employee = {
    admin: {
      leadNew: {
        icon: <NewReleasesIcon className='mt-3'
        sx={{ color: '#4caf50', width:'100%', height:'30%' }} />, // Green color
        path: "/lead-new",
        title: 'New Leads',
        no : 10
      },
    },
  };

 

  // useEffect(() => {
  //   // if (empDetailsSuccess) {
  //     setEmployeeDetails(employeeDetails);
  //   // }
  // }, [setEmployeeDetails]); // Added necessary dependencies
  

  // Refetch employee data when login state changes
  // useEffect(() => {
  //   refetch();
  // }, [login]);

  // Function to handle GlobalBox click and navigate
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the desired path
  };

  // Dynamically generate GlobalBox components for the employee's role
  const renderRoleBoxes = () => {
    const role = activeRole; // Get role from auth store
    if (!role || !Employee[role]) return null;

    return Object.entries(Employee[role]).map(([key, value], index) => (
      <Box
        key={index}
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={() => handleNavigation(value.path)} // Navigate on click
        sx={{ cursor: 'pointer', borderRadius: '5px' }} // Add pointer cursor on hover
      >
        <GlobalBox
        
          title={value.title} // Display key as title
          subtitle={key} // Or a more appropriate subtitle
          icon={value.icon} // Set dynamic icon
          increase={value
            .no
          }
        />
      </Box>
    ));
  };

  return (
    <div>
      <Box m="70px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
          <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          </Box>
        </Box>

        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {renderRoleBoxes()} {/* Render boxes based on role */}
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
