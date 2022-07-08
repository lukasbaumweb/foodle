import React from "react";
import {
  Box,
  Button,
  Container,
  Slide,
  Snackbar,
  Typography,
} from "@mui/material";
import FoodBoy from "./../assets/images/foodboy.png";

const CookieNotice = ({ onAccept }) => {
  const TransitionUp = (props) => <Slide {...props} direction="up" />;

  const CustomSnackBar = (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionComponent={TransitionUp}
      message="Akzeptiere unsere Cookie-Richtlinie, da wir dir sonst unseren Service nicht anbieten können"
      action={
        <Button
          color="primary"
          size="small"
          variant="contained"
          onClick={onAccept}
        >
          Akzeptieren
        </Button>
      }
      open={true}
    />
  );

  return (
    <Container maxWidth="md" height="100vh" sx={{ pt: 5, pb: "20%" }}>
      <Box textAlign="center">
        <img src={FoodBoy} alt="Foodle Logo" width="80%" />
      </Box>
      <Typography variant="h3" component="h1" sx={{ mt: 3 }}>
        Herzlich Willkommen
      </Typography>

      <Typography variant="subtitle1" component="h1" sx={{ mt: 3 }}>
        Bevor du loslegen kannst, musst du nur noch unsere Cookie-Richtlinie
        akzeptieren.
      </Typography>

      <h2>Cookie-Richtlinie für Foodle</h2>

      <p>
        Dies ist die Cookie-Richtlinie für Foodle, zugänglich über{" "}
        {window.location.host}
      </p>

      <p>
        <strong>Was sind Cookies?</strong>
      </p>

      <p>
        Wie bei fast allen professionellen Websites üblich, verwendet diese
        Website Cookies, das sind kleine Dateien, die auf Ihren Computer
        heruntergeladen werden, um Ihr Erlebnis zu verbessern. Diese Seite
        beschreibt, welche Informationen sie gesammelt werden, wie wir sie
        verwenden und warum wir diese Cookies manchmal speichern müssen. We will
        also share how you can prevent these cookies from being stored however
        this may downgrade or 'break' certain elements of the sites
        Funktionalität.
      </p>

      <p>
        <strong>Wie wir Cookies verwenden</strong>
      </p>

      <p>
        Wir verwenden Cookies aus einer Reihe von Gründen, die im Folgenden
        näher erläutert werden. Leider gibt es in gibt es in den meisten Fällen
        keine Standardoptionen zur Deaktivierung von Cookies Cookies zu
        deaktivieren, ohne die Funktionen und Merkmale, die sie auf dieser
        dieser Website. It is recommended that you leave on all cookies if you
        are not sure whether you need them or not in case they are used to
        provide a Dienstleistung, die Sie nutzen.
      </p>

      <p>
        <strong>Disabling Cookies</strong>
      </p>

      <p>
        Sie können das Setzen von Cookies verhindern, indem Sie die
        Einstellungen in Ihrem Browser (siehe Hilfe Ihres Browsers). Beachten
        Sie bitte, dass dass die Deaktivierung von Cookies die Funktionalität
        dieser und vieler anderer Websites, die Sie besuchen, beeinträchtigt.
        Disabling cookies will usually result in also disabling certain
        functionality and features of the this site. Therefore wird empfohlen,
        Cookies nicht zu deaktivieren.
      </p>
      <p>
        <strong>Die von uns gesetzten Cookies</strong>
      </p>

      <ul>
        <li>
          <p>Kontobezogene Cookies</p>
          <p>
            Wenn Sie ein Konto bei uns anlegen, verwenden wir Cookies für die
            Verwaltung des Anmeldevorgangs und der allgemeinen Verwaltung. Diese
            Cookies werden normalerweise gelöscht, wenn Sie sich abmelden, aber
            in einigen können sie jedoch in einigen Fällen zurückbleiben, um
            Ihre Website-Einstellungen wenn Sie abgemeldet sind.
          </p>
        </li>

        <li>
          <p>Anmeldebezogene Cookies</p>
          <p>
            Wir verwenden Cookies, wenn Sie eingeloggt sind, damit wir uns diese
            Tatsache merken können. Tatsache merken. So müssen Sie sich nicht
            jedes Mal neu anmelden, wenn Sie eine wenn Sie eine neue Seite
            besuchen. Diese Cookies werden in der Regel entfernt oder geleert
            when you log out to ensure that you can only access restricted
            Funktionen und Bereiche nur dann zugreifen können, wenn Sie
            eingeloggt sind.
          </p>
        </li>

        <li>
          <p>Formularebezogene Cookies</p>
          <p>
            Wenn Sie Daten über ein Formular übermitteln, z. B. auf
            Kontaktseiten oder Kommentarformularen können Cookies gesetzt
            werden, um Ihre Benutzerdaten für zukünftige Korrespondenz zu
            speichern.
          </p>
        </li>

        <li>
          <p>Cookies für Website-Einstellungen</p>
          <p>
            Um Ihnen einen angenehmen Aufenthalt auf dieser Website zu
            ermöglichen, bieten wir bieten wir Ihnen die Möglichkeit, Ihre
            Präferenzen für die Nutzung dieser Website bei der Nutzung der
            Website. Um Ihre Präferenzen zu speichern, müssen wir müssen wir
            Cookies setzen, damit diese Informationen jedes Mal abgerufen werden
            können, wenn Sie Interaktion mit einer Seite durch Ihre Präferenzen
            beeinflusst wird.
          </p>
        </li>
      </ul>

      <p>
        <strong>Cookies von Dritten</strong>
      </p>

      <p>
        In einigen besonderen Fällen verwenden wir auch Cookies, die von
        vertrauenswürdigen Dritten Parteien. Der folgende Abschnitt beschreibt,
        welche Cookies von Dritten Sie Sie auf dieser Website begegnen können.
      </p>

      <ul>
        <li>
          <p>
            Diese Website verwendet Google Analytics, eine der am weitesten
            verbreiteten und vertrauenswürdigsten Analyselösungen im Web, die
            uns helfen zu zu verstehen, wie Sie die Website nutzen und wie wir
            Ihr Erlebnis verbessern können. Erfahrung. Diese Cookies können z.
            B. aufzeichnen, wie lange Sie spend on the site and the pages that
            you visit so we can continue to ansprechende Inhalte zu produzieren.
          </p>
          <p>
            Weitere Informationen zu Google Analytics-Cookies finden Sie auf der
            offiziellen Google Analytics-Seite.
          </p>
        </li>

        <li>
          <p>
            Von Zeit zu Zeit testen wir neue Funktionen und nehmen geringfügige
            Änderungen an der an der Art und Weise, wie die Website
            bereitgestellt wird. Wenn wir noch neue Funktionen testen Funktionen
            testen, können diese Cookies verwendet werden, um sicherzustellen,
            dass Sie eine ein einheitliches Erlebnis auf der Website zu
            gewährleisten, während wir zu verstehen, welche Optimierungen unsere
            Nutzer am meisten schätzen.
          </p>
        </li>
      </ul>
      <Typography variant="h5" textAlign="center">
        Deine Foodle Entwickler ❤
      </Typography>
      {CustomSnackBar}
    </Container>
  );
};

export default CookieNotice;
