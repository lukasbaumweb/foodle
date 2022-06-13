import {
  Container,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  Fab,
  SpeedDial,
  Backdrop,
} from "@mui/material";
import React, { useState } from "react";

import Recipes from "./../assets/images/recipes.jpg";
import CookBook from "./../assets/images/cook-books.jpg";
import RandomRecipe from "./../assets/images/random-recipe.jpg";
import GroceriesList from "./../assets/images/groceries-list.jpg";
import useTheme from "@mui/material/styles/useTheme";
import { useNavigate } from "react-router-dom";
import ROUTES from "./../utils/routes";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";

const Home = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const actions = [
    {
      icon: <AddIcon />,
      name: "Rezept",
      onClick: () => {
        navigate(ROUTES.public.setRecipe.path.replace(":id", "new"));
      },
    },
    { icon: <ShareIcon />, name: "Share" },
  ];

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={4} lg={3}>
          <Card>
            <CardActionArea
              onClick={() => navigate(ROUTES.public.recipes.path)}
            >
              <CardMedia component="img" image={Recipes} alt="Rezepte" />
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ bgcolor: theme.palette.primary.main, p: 1, margin: 0 }}
                textAlign="center"
              >
                Rezepte
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <Card>
            <CardActionArea
              onClick={() => navigate(ROUTES.public.cookingBooks.path)}
            >
              <CardMedia component="img" image={CookBook} alt="Kochbücher" />
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ bgcolor: theme.palette.primary.main, p: 1, margin: 0 }}
                textAlign="center"
              >
                Kochbücher
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <Card>
            <CardActionArea
              onClick={() => navigate(ROUTES.public.randomRecipe.path)}
            >
              <CardMedia
                component="img"
                image={RandomRecipe}
                alt="Zufallsrezept"
              />
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ bgcolor: theme.palette.primary.main, p: 1, margin: 0 }}
                textAlign="center"
              >
                Zufallsrezept
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <Card>
            <CardActionArea
              onClick={() => navigate(ROUTES.public.groceryList.path)}
            >
              <CardMedia
                component="img"
                image={GroceriesList}
                alt="Einkaufsliste"
              />
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ bgcolor: theme.palette.primary.main, p: 1, margin: 0 }}
                textAlign="center"
              >
                Einkaufsliste
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Container>
  );
};

export default Home;
