import React from "react";
import { Container, Grid, Typography, useTheme } from "@mui/material";
import MaterialUISwitch from "../../components/NightModeSwitch";
import { ColorModeContext } from "../../utils/ThemeProvider";
import { Auth } from "../../utils/auth";

const Settings = () => {
  const colorMode = React.useContext(ColorModeContext);
  const theme = useTheme();
  const auth = new Auth();

  return (
    <Container maxWidth="xs" sx={{ pt: 5 }}>
      <Typography variant="h4">Einstellungen</Typography>
      <Grid container sx={{ pt: 2 }}>
        <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle">Nachtmodus</Typography>
        </Grid>
        <Grid item xs={8} sx={{ textAlign: "right" }}>
          <MaterialUISwitch
            onClick={colorMode.toggleColorMode}
            checked={theme.palette.mode === "dark"}
          />
        </Grid>
      </Grid>
      <pre>{JSON.stringify(auth.getUser(), null, 2)}</pre>
    </Container>
  );
};

export default Settings;
