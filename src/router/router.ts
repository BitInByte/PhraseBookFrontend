// // Import components
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
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
  { path: "/auth", exact: false, component: AuthPage },
  { path: "/", exact: true, component: HomePage },
];
