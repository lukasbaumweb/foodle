const ROUTES = {
  home: { path: "/" },
  public: {
    login: { path: "/login" },
    register: { path: "/register" },
    resetPassword: { path: "/resetPassword" },
    recipes: { path: "/recipes" },
    cookingBooks: { path: "/cookingBooks" },
    randomRecipe: { path: "/randomRecipe" },
    groceryList: { path: "/groceryList" },
    about: { path: "/about" },
  },
  private: {
    home: { path: "/" },
    foodle: { path: "/foodle/:id" },
    account: { path: "/account" },
    settings: { path: "/settings" },
  },
};
export default ROUTES;
