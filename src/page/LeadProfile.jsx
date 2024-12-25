import React, { useEffect, useState } from 'react';
import { Button, Paper, Box, Alert, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useFetchSingleLeadQuery, useForwardMutation, } from '../Service/Query';
import LeadDetails from '../Component/LeadDetails';
import VerifyContactDetails from '../Component/leads/DetailsVerification';
import useStore from '../Store';
import BarButtons from '../Component/BarButtons';
import useAuthStore from '../Component/store/authStore';
import ApplicantProfileData from '../Component/applicantProfileData';

const barButtonOptions = ['Lead', 'Verification',]


const LeadProfile = () => {
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState("lead");
    const { setLead } = useStore()
    const [leadEdit, setLeadEdit] = useState(false);


    const { data: leadData, isSuccess: leadSuccess, isError, error } = useFetchSingleLeadQuery(id, { skip: id === null });
    const [forward, { data, isLoading, isSuccess, isError: isForwardError, error: forwardError }] = useForwardMutation()


    const sendDataToAllcloud = () => {
        forward(id)
    }
    useEffect(() => {
        if (leadSuccess && leadData) {
            console.log("set lead", leadData)
            setLead(leadData?.lead)
        }

    }, [leadSuccess, leadData])


    return (
        <div className="crm-container">

            {leadEdit ? (
                <LeadDetails leadData={leadData?.lead} setLeadEdit={setLeadEdit} />
            ) : (
                <>
                    <div className="p-3">
                        <BarButtons
                            barButtonOptions={barButtonOptions}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />

                        {currentPage === "lead" &&
                            <>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        padding: '20px',
                                        marginTop: '20px',
                                        borderRadius: '10px',
                                        color: '#1F2A40',  // Default text color for rows
                                        '& .MuiDataGrid-columnHeaders': {
                                            backgroundColor: '#1F2A40',  // Optional: Header background color
                                            color: 'white',  // White text for the headers
                                        },
                                        '& .MuiDataGrid-footerContainer': {
                                            backgroundColor: '#1F2A40',  // Footer background color
                                            color: 'white',  // White text for the footer
                                        },
                                        '& .MuiDataGrid-row:hover': {
                                            backgroundColor: 'white',
                                            cursor: 'pointer',
                                        },
                                        '& .MuiDataGrid-row': {
                                            backgroundColor: 'white',
                                        },
                                    }}
                                >
                                    <ApplicantProfileData leadData={leadData} />

                                    {isError &&
                                        <Alert severity="error" sx={{ borderRadius: '8px', mt: 2 }}>
                                            {error?.data?.message}
                                        </Alert>
                                    }
                                    {<Box display="flex" justifyContent="flex-end" sx={{ my: 2 }}>
                                        <Button
                                            variant="outlined"
                                            onClick={() => setLeadEdit(true)}
                                            sx={{
                                                backgroundColor: 'primary.main',
                                                color: 'white',
                                                padding: '10px 20px',
                                                '&:hover': {
                                                    backgroundColor: 'darkPrimary',
                                                },
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </Box>}
                                </Paper>
                                {<Box display="flex" justifyContent="flex-end" sx={{ my: 2 }}>
                                    <Button
                                        // variant="outlined"
                                        onClick={() => sendDataToAllcloud()}
                                        sx={{
                                            backgroundColor: (isLoading) ? "#f2c491" : "#f29d41",
                                            color: (isLoading) ? "#666" : "white",
                                            cursor: (isLoading) ? "not-allowed" : "pointer",
                                            "&:hover": {
                                              backgroundColor: "#f2c491",
                                            },
                                          }}
                                    >
                                        {(isLoading) ? <CircularProgress size={20} color="inherit" /> : "Forward"}
                                    </Button>
                                </Box>}
                            </>
                        }
                        {leadData?.lead?._id &&
                            <>
                                {currentPage === "verification" &&
                                    <VerifyContactDetails
                                        isPanVerified={leadData?.lead?.isPanVerified}
                                        isAadhaarVerified={leadData?.lead?.isAadhaarVerified}
                                        isAadhaarDetailsSaved={leadData?.lead?.isAadhaarDetailsSaved}
                                    />
                                }


                            </>
                        }
                    </div>


                </>
            )}
        </div>
    );
};

export default LeadProfile;
