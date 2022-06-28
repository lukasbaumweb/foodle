import React from "react";
import MaterialUISwitch from "../../components/NightModeSwitch";
import { useTheme } from "@emotion/react";
import { ColorModeContext } from "../../utils/ThemeProvider";
import { Box, Container, Link, Stack, Typography } from "@mui/material";

const About = () => {
  const colorMode = React.useContext(ColorModeContext);
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Typography variant="h4">Über Foodle</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
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
      <Box>
        <Typography variant="h5">Support</Typography>
        <Stack>
          <Link href="mailto:foodle-support@baum-lukas.de">
            foodle-support@baum-lukas.de
          </Link>
          <Link href="mailto:lukas.baum@fom-net.de">lukas.baum@fom-net.de</Link>
          <Link href="mailto:jan_peter.stoecker@fom.net.de">
            jan_peter.stoecker@fom-net.de
          </Link>
        </Stack>
      </Box>
      <Typography variant="body1" sx={{ mt: 3 }}>
        Made with ❤ and Caffeine by Jan & Lukas
      </Typography>
    </Container>
  );
};

export default About;
