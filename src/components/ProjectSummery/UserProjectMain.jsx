import React, { useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ProjectListCards from "../ProjectList/ProjectListCards";
import axios from "axios";
import ProjectSummery from "../ProjectSummery/ProjectSummery"
import ProjectGalleryMain from "../ProjectGallery/ProjectGalleryMain";

//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';


const UserProject = () => {
    const selectedProject = useSelector((store) => store.selectedProject);
    const user = useSelector((store) => store.user);
    const blue = {
        50: '#e0e2e4',// gray silver selected background
        100: '#C2E0FF',
        200: '#80BFFF',
        300: '#66B2FF',
        400: '#3399FF',// hover color
        500: '#007FFF',
        600: '#0072E5', //selected font
        700: '#0059B2',
        800: '#004C99',
        900: '#35495e', //dark blue main background
      };
      
      const Tab = styled(TabUnstyled)`
        font-family: IBM Plex Sans, sans-serif;
        color: white;
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: bold;
        background-color: transparent;
        width: 100%;
        padding: 12px 16px;
        margin: 6px 6px;
        border: none;
        border-radius: 5px;
        display: flex;
        justify-content: center;
      
        &:hover {
          background-color: ${blue[400]};
        }
      
        &:focus {
          color: #fff;
          border-radius: 3px;
          outline: 2px solid ${blue[200]};
          outline-offset: 2px;
        }
      
        &.${tabUnstyledClasses.selected} {
          background-color: ${blue[50]};
          color: ${blue[600]};
        }
      
        &.${buttonUnstyledClasses.disabled} {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `;
      
      const TabPanel = styled(TabPanelUnstyled)`
        width: 100%;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
      `;
      
      const TabsList = styled(TabsListUnstyled)`
        min-width: 320px;
        background-color: ${blue[900]};
        border-radius: 8px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: space-between;
      `;


  return (
    <>
     <h2 className="welcome">Welcome, {user.username}!</h2>
      <p className="pProject">
        Your Viewing {selectedProject.username}'s {selectedProject.title}{" "}
        project
      </p>
     <TabsUnstyled defaultValue={0}>
      <TabsList id="tabs">
        <Tab>Gallery</Tab>
        <Tab>Summary</Tab>
        <Tab>Mailbox</Tab>
      </TabsList>
      <TabPanel value={0}><ProjectGalleryMain/></TabPanel>
      <TabPanel value={1}><ProjectSummery/></TabPanel>
      <TabPanel value={2}>Coming Soon</TabPanel>
    </TabsUnstyled>
    </>
    
  );
};
export default UserProject;