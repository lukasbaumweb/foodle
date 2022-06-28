import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import NoMatch from "./views/public/NoMatch";
import About from "./views/public/About";
import Home from "./views/Home";
import Settings from "./views/_shared/Settings";
import { Auth } from "./utils/auth";
import Loader from "./components/Loader";
import ROUTES from "./utils/routes";
import Account from "./views/_shared/Account";
import Login from "./views/public/Login";
import Register from "./views/public/Register";
import ResetPassword from "./views/public/ResetPassword";
import Recipes from "./views/public/Recipes";
import CreateRecipe from "./views/public/recipe/CreateRecipe";
import Recipe from "./views/public/recipe/Recipe";
import GroceryList from "./views/public/GroceryList";
import RandomRecipe from "./views/public/RandomRecipe";
import CookingBooks from "./views/public/CookingBooks";
import Impressum from "./views/public/Impressum";
import EditRecipe from "./views/public/recipe/EditRecipe";

const AUTH_STATES = {
  waiting: "waiting",
  loggedIn: "loggedIn",
  loggedOut: "loggedOut",
};

function App() {
  const [values, setValues] = useState({
    user: null,
    authState: AUTH_STATES.waiting,
    loading: true,
  });

  useEffect(() => {
    const auth = new Auth(window);
    const user = auth.getUser();

    if (user && user.isActivated === true) {
      setValues((state) => ({
        ...state,
        authState: AUTH_STATES.loggedIn,
        loading: false,
      }));
    } else {
      setValues((state) => ({
        ...state,
        authState: AUTH_STATES.loggedOut,
        loading: false,
      }));
    }

    auth.onAuthStateChanged((user) => {
      if (user) {
        setValues((state) => ({
          ...state,
          authState: AUTH_STATES.loggedIn,
          loading: false,
        }));
      } else {
        setValues((state) => ({
          ...state,
          authState: AUTH_STATES.loggedOut,
          loading: false,
        }));
      }
    });

    return () => {};
  }, []);

  if (values.loading) {
    return <Loader />;
  }

  let renderedRoutes = [
    { element: <Home />, index: true },
    { path: ROUTES.public.recipes.path, element: <Recipes /> },
    { path: ROUTES.public.recipe.path, element: <Recipe /> },
    { path: ROUTES.public.createRecipe.path, element: <CreateRecipe /> },
    { path: ROUTES.public.editRecipe.path, element: <EditRecipe /> },
    { path: ROUTES.public.groceryList.path, element: <GroceryList /> },
    { path: ROUTES.public.randomRecipe.path, element: <RandomRecipe /> },
    { path: ROUTES.public.cookingBooks.path, element: <CookingBooks /> },
    { path: ROUTES.public.about.path, element: <About /> },
    { path: ROUTES.public.impressum.path, element: <Impressum /> },
  ];

  if (values.authState === AUTH_STATES.loggedIn) {
    renderedRoutes = [
      ...renderedRoutes,
      { path: ROUTES.private.account.path, element: <Account /> },
      { path: ROUTES.private.settings.path, element: <Settings /> },
      { path: "*", element: <NoMatch /> },
    ];
  } else if (values.authState === AUTH_STATES.loggedOut) {
    renderedRoutes = [
      ...renderedRoutes,
      { path: ROUTES.public.register.path, element: <Register /> },
      {
        path: ROUTES.public.resetPassword.path,
        element: <ResetPassword />,
      },
      { path: "/login", element: <Login /> },
      { path: "/logout", element: <Login /> },
      { path: "*", element: <Navigate to="/login" /> },
    ];
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {renderedRoutes.map(({ path, element, index }, i) => {
          if (index) return <Route index element={element} key={i} />;
          return <Route path={path} element={element} key={i} />;
        })}
      </Route>
    </Routes>
  );
}

export default App;
