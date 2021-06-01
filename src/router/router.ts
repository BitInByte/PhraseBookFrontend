import React from "react";

// Import components
import HomePage from "../pages/HomePage";
// import AuthPage from "../pages/AuthPage";

// Lazy components
const Timeline = React.lazy(() => import("../pages/TimelinePage"));

const AuthPage = React.lazy(() => import("../pages/AuthPage"));

const UserSettingPage = React.lazy(() => import("../pages/UserSettingsPage"));

const UserPage = React.lazy(() => import("../pages/UserPage"));

type routeItem = {
  path: string;
  exact: boolean;
  component: React.FC;
};

type route = routeItem[];

// const isAuthroutes = [{}];
//
// const isNotAuthRouter = [{ path: "/", exact: true, component: HomePage }];
//
// const routes = (isAuth: boolean) => (isAuth ? isAuthroutes : isNotAuthRouter);
//
// export default routes;

export const isAuthRoutes: route = [
  { path: "/user/:uid", exact: true, component: Timeline },
  { path: "/settings", exact: false, component: UserSettingPage },
  { path: "/", exact: true, component: Timeline },
];

export const isNotAuthRoutes: route = [
  { path: "/auth", exact: false, component: AuthPage },
  { path: "/", exact: true, component: HomePage },
];
