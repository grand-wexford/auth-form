import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import {
  selectTab,
  selectActionName,
  setActionName,
  changeTab,
} from './authSlice';

import { Step1, Step2, Step3 } from './Registration';
import { Auth } from './Auth';

import styles from './AuthForm.module.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export function AuthForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tab = useSelector(selectTab);
  const actionName = useSelector(selectActionName);
  const { pathname } = useLocation();


  const handleChangeTab = (_, newValue) => {
    const tabLinks = {
      0: "auth",
      1: "registration",
    };
    dispatch(changeTab(newValue));
    dispatch(setActionName(tabLinks[newValue]));
    navigate(`/${tabLinks[newValue]}`);
  }

  useEffect(() => {
    if (actionName === "confirm") {
      navigate("/registration/step2");
    }
    if (actionName === "userForm") {
      navigate("/registration/step3");
    }
  }, [actionName, navigate]);

  useEffect(() => {
    if (pathname === "/auth") {
      handleChangeTab(null, 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.authBlock}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChangeTab} aria-label="tabs">
            <Tab label="Вход" {...a11yProps(0)} />
            <Tab label="Регистрация" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={tab} index={0}>
          <Routes>
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <Routes>
            <Route index element={<Navigate to="/registration" />} />
            <Route path="/registration" element={<Step1 />} />
            <Route path="/registration/step2" element={<Step2 />} />
            <Route path="/registration/step3" element={<Step3 />} />
          </Routes>
        </TabPanel>
      </div>
    </div>
  );
}
