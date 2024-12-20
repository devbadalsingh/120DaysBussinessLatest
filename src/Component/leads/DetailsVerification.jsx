import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Swal from 'sweetalert2';
// import { useG  etEmailOtpMutation,  useLazyCheckDetailsQuery, useLazyGenerateAadhaarLinkQuery, useLazyGetPanDetailsQuery } from '../../Service/Query';
import { useNavigate, useParams } from 'react-router-dom';
import EmailVerification from './OtpVerification';
import AadhaarOtpVerification from './AadhaarOtpVerification';
import PanCompare from './PanCompare';
import Loader from '../loader';
import useAuthStore from '../store/authStore';
import AadhaarCompare from './AadhaarCompare';

const VerifyContactDetails = ({  isAadhaarVerified,isAadhaarDetailsSaved, isPanVerified , lead }) => {
  const { id } = useParams()
  const {activeRole} = useAuthStore()
  const navigate = useNavigate()
  const [otp, setOtp] = useState(false)
  const [openAadhaarCompare,setOpenAadhaarCompare] = useState()
  const [aadhaarData,setAadhaarData] = useState()
  const [otpAadhaar, setOtpAadhaar] = useState(false)
  const [panModal, setPanModal] = useState(false)
  const [otpPan, setOtpPan] = useState(false)
  const [getEmailOtp, { data: emailOtp, isSuccess: emailOtpSuccess, isError: isEmailError, error: emailError }] = useGetEmailOtpMutation()
  const [checkDetails, { data: aadhaarDetails, isSuccess: aadhaarDetailsSuccess,isLoading:aadhaarDetailsLoading, isError: isAadhaarDetailError, error: aadhaarDetailsError }] = useLazyCheckDetailsQuery()
  const [getPanDetails, panRes] = useLazyGetPanDetailsQuery()
  const [sendAadhaarLink, aadhaarRes] = useLazyGenerateAadhaarLinkQuery()

  // const handleMobileVerification = () => {
  //   // Logic for mobile verification
  //   setMobileVerified(true);
  //   Swal.fire({
  //     title: 'Mobile Verified!',
  //     icon: 'success',
  //   });
  // };


  // const handleEmailVerification = () => {
  //   getEmailOtp(id)
  // };
  const handlePanVerification = () => {
    getPanDetails(id)
  }
  const handleSendAadhaarLink = () => {
    sendAadhaarLink(id)
  }

  const handleAadhaarVerification = () => {
    checkDetails(id)

  }

  useEffect(() => {
    if (panRes?.isSuccess && panRes?.data) {
      setPanModal(true)

    }
  }, [panRes?.data, panRes?.isSuccess])

  useEffect(() => {
    if (emailOtpSuccess) {
      setOtp(true)
    }
  }, [emailOtp, emailOtpSuccess])
  useEffect(() => {
    if (aadhaarRes?.isSuccess && aadhaarRes) {
      navigate(`/lead-process`)
    }
    if (aadhaarDetails && aadhaarDetailsSuccess) {
      setOpenAadhaarCompare(true)
      setAadhaarData(aadhaarDetails?.data?.details)
    }
  }, [aadhaarRes.data, aadhaarRes?.isSuccess,aadhaarDetails,aadhaarDetailsSuccess])

  console.log('aadhaar data',aadhaarData)
  console.log("Lead Data",lead)





  return (
    <>
    {<AadhaarCompare open={openAadhaarCompare} setOpen={setOpenAadhaarCompare} aadhaarDetails={aadhaarData} />}
      {otp && <EmailVerification open={otp} setOpen={setOtp} />}
      {<PanCompare open={panModal} setOpen={setPanModal} panDetails={panRes?.data?.data} />}
      <Box sx={{ maxWidth: 700, margin: '0 auto', mt: 4 }}>
        {/* Single Accordion for Mobile and Email Verification */}
        <Accordion sx={{ borderRadius: '15px', boxShadow: 3 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              backgroundColor: '#0366fc',
              borderRadius: '5px',
              color: '#fff',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#0056b3' }
            }}
          >
            <Typography variant="h6">Documents Verification</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: '#f5f5f5', borderRadius: '15px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
  
              {/* Aadhaar Verification Section */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body1" sx={{ color: '#898b8c' }}>
                  Adhaar:
                  <span style={{ color: isAadhaarVerified ? 'green' : 'red' }}>
                    {isAadhaarVerified ? ' Verified' : ' Not Verified'}
                  </span>
                </Typography>

                {(activeRole === "screener" && !isAadhaarVerified ) && 
                <>
                {
                  isAadhaarDetailsSaved ? 
                <Button
                  // variant="contained" 
                  onClick={handleAadhaarVerification}
                  sx={{
                    backgroundColor: aadhaarRes.isLoading ? "#ccc" : "#1F2A40",
                    color: aadhaarRes.isLoading ? "#666" : "white",
                    cursor: aadhaarRes.isLoading ? "not-allowed" : "pointer",
                    "&:hover": {
                        backgroundColor: aadhaarRes.isLoading ? "#ccc" : "#3F4E64",
                    },
                }}
                  disabled={isAadhaarVerified}
                >
                  {aadhaarRes.isLoading ? <CircularProgress size={20} color="inherit" /> : `Verify Aadhaar`}
                </Button>
                :
                <Button
                  onClick={handleSendAadhaarLink}
                  sx={{
                    backgroundColor: aadhaarRes.isLoading ? "#ccc" : "#1F2A40",
                    color: aadhaarRes.isLoading ? "#666" : "white",
                    cursor: aadhaarRes.isLoading ? "not-allowed" : "pointer",
                    "&:hover": {
                        backgroundColor: aadhaarRes.isLoading ? "#ccc" : "#3F4E64",
                    },
                }}
                  disabled={isAadhaarVerified}
                >
                  {aadhaarRes.isLoading ? <CircularProgress size={20} color="inherit" /> : `Send Link`}
                </Button>
                }
                </>
                }
              </Box>


              {/* Pan Verification Section */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body1" sx={{ color: '#898b8c' }}>
                  Pan:
                  <span style={{ color: isPanVerified ? 'green' : 'red' }}>
                    {isPanVerified ? ' Verified' : ' Not Verified'}
                  </span>
                </Typography>


                {(activeRole === "screener" && !isPanVerified) && <Button
                  // variant="contained"
                  onClick={handlePanVerification}
                  sx={{
                    backgroundColor: panRes?.isLoading ? "#ccc" : "#1F2A40",
                    color: panRes?.isLoading ? "#666" : "white",
                    cursor: panRes?.isLoading ? "not-allowed" : "pointer",
                    "&:hover": {
                        backgroundColor: panRes?.isLoading ? "#ccc" : "#3F4E64",
                    },
                }}
                  disabled={panRes?.isLoading}
                >
                  {panRes?.isLoading ? <CircularProgress size={20} color="inherit" /> : `Verify Pan`}
                </Button>}
              </Box>
              {(panRes.isError || aadhaarRes.isError || isEmailError) && <Typography variant="body1">
                <span style={{ color: 'red' }}>
                  {panRes?.error?.data?.message}  {aadhaarRes?.error?.data?.message}  {emailError?.data?.message}
                </span>
              </Typography>}

            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
   );
};

export default VerifyContactDetails;
