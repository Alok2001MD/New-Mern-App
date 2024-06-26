import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { Context } from "./index";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import Home from "./Components/Home/Home";
import Jobs from "./Components/Job/Jobs";
import JobDetails from "./Components/Job/JobDetails";
import Application from "./Components/Application/Application";
import MyApplications from "./Components/Application/MyApplications";
import PostJob from "./Components/Job/PostJob";
import NotFound from "./Components/Notfound/NotFound";
import MyJobs from "./Components/Job/MyJobs";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import './App.css';

function App() {
  const { setIsAuthorized } = useContext(Context);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await axios.get(
          "https://backends-3.onrender.com/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
        console.log("Authorization check failed:", error);
      }
    };

    checkAuthorization();
  }, [setIsAuthorized]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
