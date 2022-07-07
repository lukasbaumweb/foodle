const ROUTES = {
  home: { path: "/" },

  public: {
    login: { path: "/login" },
    logout: { path: "/logout" },
    register: { path: "/register" },
    resetPassword: { path: "/resetPassword" },
    foodles: { path: "/foodles" },
    viewFoodle: { path: "/foodle/view/:id" },
    cookingBooks: { path: "/cookingBooks" },
    randomFoodle: { path: "/random" },
    about: { path: "/about" },
    impressum: { path: "/impressum" },
  },
  private: {
    home: { path: "/" },
    editFoodle: { path: "/foodle/edit/:id" },
    createFoodle: { path: "/foodle/create" },
    groceryList: { path: "/groceryList" },
    account: { path: "/account" },
    settings: { path: "/settings" },
  },
};
export default ROUTES;
