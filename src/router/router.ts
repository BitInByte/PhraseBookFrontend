import React from "react";

// Import components
import HomePage from "../pages/HomePage";
// import AuthPage from "../pages/AuthPage";

// Lazy components
const Timeline = React.lazy(() => import("../pages/TimelinePage"));

const AuthPage = React.lazy(() => import("../pages/AuthPage"));

const UserSettingPage = React.lazy(() => import("../pages/UserSettingsPage"));
// const isAuthroutes = [{}];
//
// const isNotAuthRouter = [{ path: "/", exact: true, component: HomePage }];
//
// const routes = (isAuth: boolean) => (isAuth ? isAuthroutes : isNotAuthRouter);
//
// export default routes;

export const isAuthRoutes = [
  { path: "/settings", exact: false, component: UserSettingPage },
  { path: "/", exact: true, component: Timeline },
];

export const isNotAuthRoutes = [
  { path: "/auth", exact: false, component: AuthPage },
  { path: "/", exact: true, component: HomePage },
];
