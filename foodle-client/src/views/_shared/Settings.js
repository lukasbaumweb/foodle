import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import MaterialUISwitch from "../../components/NightModeSwitch";
import { ColorModeContext } from "../../utils/ThemeProvider";
import { Auth } from "../../utils/auth";
import FoodleAPI from "../../utils/api";
import { Box } from "@mui/system";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Settings = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    tab: 0,
  });

  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  useEffect(() => {
    const api = new FoodleAPI();
    const auth = new Auth();

    console.log(auth.getUser());

    setValues((state) => ({ ...state, ...auth.getUser() }));
    return () => {};
  }, []);

  const handleTabChange = (_event, newValue) => {
    setValues({ ...values, tab: newValue });
  };

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  return (
    <Container maxWidth="md" sx={{ pt: 5 }}>
      <Typography variant="h4">Einstellungen</Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={values.tab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label="Persönliche Daten" {...a11yProps(0)} />
          <Tab label="Oberfläche" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={values.tab} index={0}>
        <Grid container component="form" spacing={2} noValidate>
          <Grid item xs={12} md={6}>
            <TextField
              name="firstName"
              label="Vorname"
              variant="filled"
              autoComplete="given-name"
              value={values.firstName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="lastName"
              label="Nachname"
              variant="filled"
              autoComplete="family-name"
              value={values.lastName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              type="email"
              id="textEmail"
              name="email"
              label="E-Mail Adresse"
              variant="filled"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        {"TODO: add change password form as tab"}
      </TabPanel>
      <TabPanel value={values.tab} index={1}>
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
      </TabPanel>
    </Container>
  );
};

export default Settings;
