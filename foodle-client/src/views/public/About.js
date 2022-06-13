import React from "react";
import MaterialUISwitch from "../../components/NightModeSwitch";
import { useTheme } from "@emotion/react";
import { ColorModeContext } from "../../utils/ThemeProvider";
import { Box, Container, Typography } from "@mui/material";

const About = () => {
  const colorMode = React.useContext(ColorModeContext);
  const theme = useTheme();

  console.log(theme);
  return (
    <Container maxWidth="md">
      <Typography variant="h5">Über Foodle</Typography>
      <Typography variant="body1">
        Aktuelle Version: {process.env.REACT_APP_FOODLE_VERSION} <br />
        Entwickler: Lukas Baum & Jan Stöcker
      </Typography>
      <Box display="flex" justifyContent="space-between" marginY="20px">
        <Typography variant="body1">Nachtmodus</Typography>
        <MaterialUISwitch
          onClick={colorMode.toggleColorMode}
          checked={theme.palette.mode === "dark"}
        />
      </Box>
      <Typography variant="body1">
        Made with ❤ and Caffeine by Jan & Lukas
      </Typography>
    </Container>
  );
};

export default About;
