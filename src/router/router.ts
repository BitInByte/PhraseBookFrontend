// // Import components
import HomePage from "../pages/HomePage";
//
// // Lazy components

// const isAuthroutes = [{}];
//
// const isNotAuthRouter = [{ path: "/", exact: true, component: HomePage }];
//
// const routes = (isAuth: boolean) => (isAuth ? isAuthroutes : isNotAuthRouter);
//
// export default routes;

export const isAuthRoutes = [{ path: "/", exact: true, component: HomePage }];

export const isNotAuthRoutes = [
  { path: "/", exact: true, component: HomePage },
];
