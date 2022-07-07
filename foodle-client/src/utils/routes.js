const ROUTES = {
  home: { path: "/" },
  public: {
    login: { path: "/login" },
    logout: { path: "/logout" },
    register: { path: "/register" },
    resetPassword: { path: "/resetPassword" },
    foodles: { path: "/foodles" },
    foodle: { path: "/foodle/view/:id" },
    editFoodle: { path: "/foodle/edit/:id" },
    createFoodle: { path: "/foodle/create" },
    cookingBooks: { path: "/cookingBooks" },
    randomFoodle: { path: "/randomFoodle" },
    groceryList: { path: "/groceryList" },
    about: { path: "/about" },
    impressum: { path: "/impressum" },
  },
  private: {
    home: { path: "/" },
    foodle: { path: "/foodle/:id" },
    account: { path: "/account" },
    settings: { path: "/settings" },
  },
};
export default ROUTES;
