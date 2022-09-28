import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { AuthForm } from './features/auth/AuthForm';

import { ThemeProvider } from "@mui/material/styles";

import theme from "./theme";
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AuthForm />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
