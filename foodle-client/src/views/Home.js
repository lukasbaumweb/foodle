import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Container,
} from "@mui/material";
import Foodles from "./../assets/images/table-with-food.jpg";
import CookBook from "./../assets/images/cook-books.jpg";
import RandomFoodle from "./../assets/images/table-with-cups.jpg";
import GroceriesList from "./../assets/images/groceries-list.jpg";
import useTheme from "@mui/material/styles/useTheme";
import { useNavigate } from "react-router-dom";
import ROUTES from "./../utils/routes";
import FoodBoy from "../assets/images/foodboy.png";

const CategoryCard = ({ title, link, img }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Card>
      <CardActionArea onClick={() => navigate(link)}>
        <CardMedia
          className="on-hover-grow"
          component="img"
          image={img}
          alt="Foodles"
        />
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ bgcolor: theme.palette.primary.main, p: 1, margin: 0 }}
          textAlign="center"
        >
          {title}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

const Home = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sx={{ marginBottom: 2 }}>
          <Container maxWidth="md">
            <Box display="flex" justifyContent="center" marginBottom={2}>
              <img src={FoodBoy} width="50%" alt="Foodboy" />
            </Box>
            <Typography variant="h3" textAlign="center">
              Willkommen bei Foodle!
            </Typography>
            <Typography variant="body1" textAlign="center">
              Das Rezeptbuch, das nie schmutzig wird für dich und deine Familie
            </Typography>
          </Container>
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <CategoryCard
            title="Foodles"
            link={ROUTES.public.foodles.path}
            img={Foodles}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <CategoryCard
            title="Kategorien"
            link={ROUTES.public.categories.path}
            img={CookBook}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <CategoryCard
            title="Zufallsfoodle"
            link={ROUTES.public.randomFoodle.path}
            img={RandomFoodle}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <CategoryCard
            title="Einkaufsliste"
            link={ROUTES.private.groceryList.path}
            img={GroceriesList}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
