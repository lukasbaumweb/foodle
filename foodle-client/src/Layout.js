import { Box, Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ToTopButton from "./components/ToTopButton";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Container
        component="main"
        sx={{
          display: "flex",
          minHeight: "100%",
          flexDirection: "column",
          flexGrow: 1,
          mt: 1,
          mb: 2,
        }}
      >
        <Outlet />
      </Container>

      <ToTopButton />
      <Footer />
    </Box>
  );
};

export default Layout;
