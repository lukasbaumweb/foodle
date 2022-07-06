import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import Recipes from "./../assets/images/recipes.jpg";
import CookBook from "./../assets/images/cook-books.jpg";
import RandomRecipe from "./../assets/images/random-recipe.jpg";
import GroceriesList from "./../assets/images/groceries-list.jpg";
import useTheme from "@mui/material/styles/useTheme";
import { useNavigate } from "react-router-dom";
import ROUTES from "./../utils/routes";
import RecipeDial from "../components/RecipeDial";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={4} lg={3}>
          <Card>
            <CardActionArea
              onClick={() => navigate(ROUTES.public.recipes.path)}
            >
              <CardMedia component="img" image={Recipes} alt="Foodles" />
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ bgcolor: theme.palette.primary.main, p: 1, margin: 0 }}
                textAlign="center"
              >
                Foodles
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
                alt="Zufallsfoodle"
              />
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ bgcolor: theme.palette.primary.main, p: 1, margin: 0 }}
                textAlign="center"
              >
                Zufallsfoodle
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
      <RecipeDial />
    </Container>
  );
};

export default Home;
