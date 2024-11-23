/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../conponents/Hero";
import BlogList from "./Blog";


const Dashboard = () => {
  return (
    <>
     <Hero />
     <BlogList />
     
    </>
  );
};

export default Dashboard;
