import './App.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from '@mui/system';
import { CssBaseline } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import PassGenerator from './PassGenerator';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

export default function App(){

  return (
    <>
    <CssBaseline/>
    <Container maxWidth='sm' style={{
      marginTop:'100px',
    }}>
      <PassGenerator/>
    </Container>
    <ToastContainer />
  </>
  );
}