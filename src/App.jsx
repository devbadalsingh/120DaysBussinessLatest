import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Component/LoginPage";
import Dashboard from "./Component/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Navbar/Sidebar";
import { useEffect, useState } from "react";
import ForgotPasswordPage from "./Component/ForgotPasswordPage";
import ResetPasswordPage from "./Component/ResetPasswordPage";
import LeadNew from "./SubComponent/LeadNew";
import ProtectedRoute from "./Component/ProtectedRoute";
import LeadProfile from "./page/LeadProfile";

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [theme, colorMode] = useMode();
    return (
        <Router>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />

                        {/* <Route path='/logout' element={<LogOutPage/>} /> */}
                        <Route
                            path="/forgot-password"
                            element={<ForgotPasswordPage />}
                        />
                        <Route
                            path="/reset-password"
                            element={<ResetPasswordPage />}
                        />
                    </Routes>
                    <>
                        <ProtectedRoute>
                            <Navbar />

                            <Sidebar
                                isSidebarOpen={isSidebarOpen}
                                setIsSidebarOpen={setIsSidebarOpen}
                            />
                            <div
                                style={{
                                    marginLeft: isSidebarOpen ? "250px" : "0px",
                                }}
                            >
                                <Routes>
                                    {/* <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}> */}
                                    <Route path="/" element={<Dashboard />} />
                                      <Route
                                        path="/lead-new"
                                        element={<LeadNew />}
                                    />
                                    <Route
                                        path="/lead-profile/:id"
                                        element={<LeadProfile />}
                                        />

                                    
                                </Routes>
                            </div>
                        </ProtectedRoute>
                        {/* <Navbar /> */}
                    </>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </Router>
    );
}

export default App;
