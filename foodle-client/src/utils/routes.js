const ROUTES = {
  home: { path: "/" },
  public: {
    login: { path: "/login" },
    logout: { path: "/logout" },
    register: { path: "/register" },
    resetPassword: { path: "/resetPassword" },
    recipes: { path: "/recipes" },
    recipe: { path: "/recipe/view/:id" },
    editRecipe: { path: "/recipe/edit/:id" },
    createRecipe: { path: "/recipe/create" },
    cookingBooks: { path: "/cookingBooks" },
    randomRecipe: { path: "/randomRecipe" },
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
