import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import Foodles from "./../assets/images/table-with-food.jpg";
import CookBook from "./../assets/images/cook-books.jpg";
import RandomFoodle from "./../assets/images/table-with-cups.jpg";
import GroceriesList from "./../assets/images/groceries-list.jpg";
import useTheme from "@mui/material/styles/useTheme";
import { useNavigate } from "react-router-dom";
import ROUTES from "./../utils/routes";
import FoodleDial from "../components/FoodleDial";
import Logo from "../assets/images/orignal-sizes/foodles.png";

const CategoryCard = ({ title, link, img }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Card>
      <CardActionArea onClick={() => navigate(link)}>
        <CardMedia
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          sx={{
            transition: "transform 0.15s ease-in-out",
            transform: hover ? "scale3d(1.05, 1.05, 1)" : "initial",
          }}
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
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12}>
          <img src={Logo} width="70%" />
          <Typography variant="h3">Willkommen bei Foodles</Typography>
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
            title="Kochbücher"
            link={ROUTES.public.cookingBooks.path}
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
      <FoodleDial />
    </Container>
  );
};

export default Home;
