import React from 'react'

import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { formatDate } from '../utils/helper';


const ApplicantProfileData = ({leadData}) => {


    console.log("The Lead data is",leadData)

    const columns = [
        { label: "Full Name", value: leadData?.lead?.fullName, label2: "Aadhaar Number", value2: leadData?.lead?.aadhaar },
        { label: "PAN Number", value: leadData?.lead?.pan, label2: "Mobile Number", value2: leadData?.lead?.mobile },
        { label: "Personal Email", value: leadData?.lead?.personalEmail, label2: "Business Name", value2: leadData?.lead?.businessName },
        { label: "Property Type", value: leadData?.lead?.propertyType, label2: "GST Number", value2: leadData?.lead?.gstNo },
        { label: "Loan Amount", value: leadData?.lead?.loanAmount, label2: "Turnover", value2: leadData?.lead?.turnover },
        { label: "State", value: leadData?.lead?.state, label2: "City", value2: leadData?.lead?.city },
        { label: "Pin Code", value: leadData?.lead?.pinCode, label2: "Source", value2: leadData?.lead?.source }
      
    ];
    return (
        <>
            <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
                <Table aria-label="application details table">
                    <TableBody>
                        {columns.map((row, index) => (
                            <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#141b2d' } }}>
                                <TableCell align="left" sx={{ fontWeight: 500 }}>{row.label}</TableCell>
                                <TableCell align="left">{row.value || ''}</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 500 }}>{row.label2}</TableCell>
                                <TableCell align="left">{row.value2 || ''}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}

export default ApplicantProfileData
