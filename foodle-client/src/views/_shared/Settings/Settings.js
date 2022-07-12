import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import MaterialUISwitch from "../../../components/NightModeSwitch";
import { ColorModeContext } from "../../../utils/ThemeProvider";
import { Auth } from "../../../utils/auth";
import FoodleAPI from "../../../utils/api";
import UserDataForm from "./UserDataForm";
import SecurityForm from "./SecurityForm";

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
    isDirty: false,
  });

  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  useEffect(() => {
    const auth = new Auth();

    auth
      .getCurrentUser()
      .then((res) => {
        setValues((state) => ({ ...state, ...res.data }));
      })
      .catch((err) => console.error(err));

    setValues((state) => ({ ...state }));
    return () => {};
  }, []);

  const handleTabChange = (_event, newValue) => {
    setValues({ ...values, tab: newValue });
  };

  return (
    <Container maxWidth="md" sx={{ pt: 5 }}>
      <Typography variant="h4">Einstellungen</Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={values.tab}
          onChange={handleTabChange}
          aria-label="Einstellungen"
        >
          <Tab label="Persönliche Daten" {...a11yProps(0)} />
          <Tab label="Sicherheit" {...a11yProps(1)} />
          <Tab label="Oberfläche" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={values.tab} index={0}>
        <UserDataForm />
      </TabPanel>
      <TabPanel value={values.tab} index={1}>
        <SecurityForm />
      </TabPanel>
      <TabPanel value={values.tab} index={2}>
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
