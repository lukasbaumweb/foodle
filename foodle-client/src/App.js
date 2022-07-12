import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import NoMatch from "./views/public/NoMatch";
import About from "./views/public/About";
import Home from "./views/Home";
import Settings from "./views/_shared/Settings/Settings";
import { Auth } from "./utils/auth";
import Loader from "./components/Loader";
import ROUTES from "./utils/routes";
import FoodlesByAuthor from "./views/_shared/MyFoodles";
import Login from "./views/public/Login";
import Register from "./views/public/Register";
import ResetPassword from "./views/public/ResetPassword";
import Foodles from "./views/public/Foodles";
import Foodle from "./views/_shared/foodle/ViewFoodle";
import CreateFoodle from "./views/public/foodle/CreateFoodle";
import EditFoodle from "./views/public/foodle/EditFoodle";
import GroceryList from "./views/public/GroceryList";
import RandomFoodle from "./views/public/RandomFoodle";
import Categories from "./views/public/Categories";
import Impressum from "./views/public/Impressum";
import CookieNotice from "./components/CookieNotice";
import { CONFIG } from "./utils/config";
import ChangeLog from "./views/public/ChangeLog";

const AUTH_STATES = {
  waiting: "waiting",
  loggedIn: "loggedIn",
  loggedOut: "loggedOut",
};

const COOKIES_ALLOWED =
  window.localStorage.getItem(CONFIG.LOCAL_STORAGE_COOKIE_KEY) || 0;

function App() {
  const [values, setValues] = useState({
    authState: AUTH_STATES.waiting,
    loading: true,
    cookiesAccepted: Boolean(COOKIES_ALLOWED),
  });

  useEffect(() => {
    const auth = new Auth();

    auth
      .getCurrentUser()
      .then((user) => {
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
      })
      .catch((err) => {
        console.error(err);
        setValues((state) => ({
          ...state,
          authState: AUTH_STATES.loggedOut,
          loading: false,
        }));
      });
    return () => {};
  }, []);

  if (values.loading) return <Loader />;

  let renderedRoutes = [
    { element: <Home />, index: true },
    { path: ROUTES.public.foodles.path, element: <Foodles /> },
    { path: ROUTES.public.categories.path, element: <Categories /> },
    { path: ROUTES.public.viewFoodle.path, element: <Foodle /> },
    { path: ROUTES.public.randomFoodle.path, element: <RandomFoodle /> },
    { path: ROUTES.public.about.path, element: <About /> },
    { path: ROUTES.public.impressum.path, element: <Impressum /> },
    { path: ROUTES.public.changeLog.path, element: <ChangeLog /> },
  ];

  if (values.authState === AUTH_STATES.loggedIn) {
    renderedRoutes = [
      ...renderedRoutes,
      { path: ROUTES.private.myFoodles.path, element: <FoodlesByAuthor /> },
      { path: ROUTES.private.settings.path, element: <Settings /> },
      { path: ROUTES.private.createFoodle.path, element: <CreateFoodle /> },
      { path: ROUTES.private.editFoodle.path, element: <EditFoodle /> },
      { path: ROUTES.private.groceryList.path, element: <GroceryList /> },
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
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <Login />,
      },
      { path: "*", element: <Navigate to="/login" /> },
    ];
  }

  if (!values.cookiesAccepted) {
    return (
      <CookieNotice
        onAccept={() => {
          window.localStorage.setItem(CONFIG.LOCAL_STORAGE_COOKIE_KEY, 1);
          setValues({ ...values, cookiesAccepted: true });
        }}
      />
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {renderedRoutes.map(({ path, element, index }, i) => {
            if (index) return <Route index element={element} key={i} />;
            return <Route path={path} element={element} key={i} />;
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
