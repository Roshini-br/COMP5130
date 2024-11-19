export default {
  Base: "/api",
  Restaurant: {
    Base: "/restaurants",
    Get: "/",
    GetById: "/:id",
  },
  Cart: {
    Base: "/cart",
    Add: "/add",
    Get: "/:user",
    Remove: "/remove/:user/:itemName/:restaurantId",
    Update: "/update/:user/:itemName/:restaurantId",
    Clear: "/clear/:user",
  },
  Orders: {
    Base: "/orders",
    GetAll: "/",
    GetById: "/:id",
    GetByUserId: "/user/:user",
    Create: "/create",
    UpdateStatus: "/update/:id",
    Delete: "/delete/:id",
  },
  Users: {
    Base: "/user",
    GetById: "/:id",
    Create: "/create",
    Update: "/update/:id",
    Login: "/login",
  },
  Payment: {
    Base: "/payment",
    Create: "/",
  },
} as const;
