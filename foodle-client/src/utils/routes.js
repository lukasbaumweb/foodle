const ROUTES = {
  home: { path: "/" },

  public: {
    login: { path: "/login" },
    logout: { path: "/logout" },
    register: { path: "/register" },
    resetPassword: { path: "/resetPassword" },
    foodles: { path: "/foodles" },
    viewFoodle: { path: "/foodle/view/:id" },
    categories: { path: "/categories" },
    randomFoodle: { path: "/random" },
    about: { path: "/about" },
    impressum: { path: "/impressum" },
    changeLog: { path: "/log" },
  },
  private: {
    home: { path: "/" },
    editFoodle: { path: "/foodle/edit/:id" },
    createFoodle: { path: "/foodle/create" },
    groceryList: { path: "/groceryList" },
    myFoodles: { path: "/my" },
    settings: { path: "/settings" },
  },
};
export default ROUTES;
