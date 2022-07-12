import React from "react";
import MaterialUISwitch from "../../components/NightModeSwitch";
import { useTheme } from "@emotion/react";
import { ColorModeContext } from "../../utils/ThemeProvider";
import { Box, Container, Link, Stack, Typography } from "@mui/material";
import AppStores from "../../components/AppStores";

const About = () => {
  const colorMode = React.useContext(ColorModeContext);
  const theme = useTheme();
  const isPWAInstalled = window.matchMedia("(display-mode:standalone)").matches;

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Typography variant="h4">Über Foodle</Typography>
      <Typography variant="body1" sx={{ my: 2 }}>
        Aktuelle Version: {process.env.REACT_APP_FOODLE_VERSION} <br />
        Entwickler: Lukas Baum & Jan Stöcker
      </Typography>
      <Box display="flex" justifyContent="space-between" marginT={5}>
        <Typography variant="body1">Nachtmodus</Typography>
        <MaterialUISwitch
          onClick={colorMode.toggleColorMode}
          checked={theme.palette.mode === "dark"}
        />
      </Box>

      <Typography variant="h5" sx={{ mt: 5, pb: 2 }}>
        App
      </Typography>
      <Typography>
        Die PWA (Progressive Web App) ist {!isPWAInstalled && "nicht"}{" "}
        installiert.
      </Typography>

      <AppStores sx={{ mt: 5 }} />

      <Box sx={{ mt: 5 }}>
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

      {process.env.REACT_APP_PAYPAL_LINK && (
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            Donate
          </Typography>
          <form
            action="https://www.paypal.com/donate"
            method="post"
            target="_top"
            style={{ textAlign: "center" }}
          >
            <input
              type="hidden"
              name="hosted_button_id"
              value="TGKZNP977QMLN"
            />
            <input
              type="image"
              src="https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif"
              border="0"
              name="submit"
              title="PayPal - The safer, easier way to pay online!"
              alt="Spenden mit dem PayPal-Button"
            />
            <img
              alt=""
              border="0"
              src="https://www.paypal.com/de_DE/i/scr/pixel.gif"
              width="1"
              height="1"
            />
          </form>
          <Link href={process.env.REACT_APP_PAYPAL_LINK}>PayPal</Link>
        </Box>
      )}

      <Typography variant="body1" sx={{ mt: 3 }}>
        Made with ❤ and Caffeine by Jan & Lukas
      </Typography>
    </Container>
  );
};

export default About;
