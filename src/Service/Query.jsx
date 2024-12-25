import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import useAuthStore from '../Component/store/authStore';
import { BASE_URL } from './BaseURL';
// const role = useAuthStore()
const role = () => JSON.parse(localStorage.getItem("auth-storage")).state.activeRole
// Define a service using a base URL and expected endpoints
export const leadsApi = createApi({
  reducerPath: "leadsApi",
  baseQuery: fetchBaseQuery({
   
    baseUrl:BASE_URL,

    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  tagTypes: ["leadProfile", "rejectedLeads", "holdLeads", "logs"],
  endpoints: (builder) => ({
    // GET request to fetch a Pokemon by name
    getEmployees: builder.query({
      query: () => `employees/me/?role=${role()}`,
    }),
    //
  

    // POST request to send data (this should use builder.mutation)
    loginUser: builder.mutation({
      query: (data) => ({
        url: `employees/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `employees/logout/?role=${role()}`,
        method: "POST",
      }),
    }),
    forward: builder.mutation({
      query: (id) => ({
        url: `/leads/sendDataToAllcloud/${id}/?role=${role()}`,
        method: "POST",
      }),
    }),

    updateLead: builder.mutation({
      query: ({ id, formData }) => ({
        url: `leads/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["leadProfile"],
    }),
    verifyAadhaarOtp: builder.mutation({
      query: ({ id, transactionId, otp,codeVerifier,fwdp }) => ({
        url: `verify/aadhaar-otp/?id=${id}&role=${role()}`,
        method: "POST",
        body: { otp,codeVerifier,fwdp,transactionId },
      }),
      invalidatesTags: ["leadProfile"],
    }),
    verifyAadhaar: builder.mutation({
      query: ({ id, details }) => ({
        url: `verify/verifyAadhaar/${id}/?role=${role()}`,
        method: "PATCH",
       
      }),
      invalidatesTags: ["leadProfile"],
    }),
    verifyPan: builder.mutation({
      query: ({ id, data }) => ({
        url: `verify/pan/${id}/?role=${role()}`,
        method: "POST",
        body: { data },
      }),
      invalidatesTags: ["leadProfile"],
    }),

    fetchAllLeads: builder.query({
      query: ({ page, limit }) =>
        `/leads/?page=${page}&limit=${limit}&role=${role()}`,
    }),
    forwardedLeads: builder.query({
      query: ({ page, limit }) =>
        `/leads/forwarded-leads/?page=${page}&limit=${limit}&role=${role()}`,
    }),
    fetchSingleLead: builder.query({
      query: (id) => `/leads/${id}/?role=${role()}`,
      providesTags: ["leadProfile"],
    }),
    aadhaarOtp: builder.query({
      query: (id) => `verify/aadhaar/${id}/?role=${role()}`,
      // providesTags:["leadProfile"]
    }),
    getPanDetails: builder.query({
      query: (id) => `verify/pan/${id}/?role=${role()}`,
      // providesTags:["leadProfile"]
    }),
    // get the lead numbers
    getLeadTotalRecords: builder.query({
      query: () => `leads/totalRecords/?role=${role()}`,
    }),
 
    // get the totalRecordsForSupervisor
    generateAadhaarLink: builder.query(
      {
        query: (id) => `verify/generate-link/${id}/?role=${role()}`
      }
    ),
    checkDetails: builder.query(
      {
        query: (id) => `verify/verifyAadhaar/${id}/?role=${role()}`
      }
    ),
  }),
});

// Export hooks for usage in functional components
// Note: Mutations use `useMutation`, not `useQuery`
export const {
  useLoginUserMutation,
  useLogoutMutation,
  useGetEmployeesQuery,
  useFetchAllEmployeeQuery,
  useForwardMutation,
  useFetchAllocatedLeadsQuery,
  useFetchAllLeadsQuery,
  useFetchSingleLeadQuery,
  useForwardedLeadsQuery,
  useUpdateLeadMutation,
  useLazyAadhaarOtpQuery,
  useVerifyPanMutation,
  useVerifyAadhaarOtpMutation,
  useVerifyAadhaarMutation,
  useLazyGetPanDetailsQuery,
  useGetLeadTotalRecordsQuery,
  useLazyGenerateAadhaarLinkQuery,
  useLazyCheckDetailsQuery,

} = leadsApi;
