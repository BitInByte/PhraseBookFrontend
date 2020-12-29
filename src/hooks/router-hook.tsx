// Import Libraries
import React, { useCallback, useEffect, useState, useRef } from "react";
import { Route, Switch } from "react-router-dom";

// Import components
// import HomePage from "../pages/HomePage";

import { isAuthRoutes, isNotAuthRoutes } from "../router/router";

// Interface
type routeType = {
  path: string;
  exact: boolean;
  component: React.FC;
};

const useRouters = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // let isAuthenticated = false;
  const authRoutes = isAuthRoutes;
  const notAuthRoutes = isNotAuthRoutes;
  console.log(isAuthenticated);

  const toggleIsAuthenticated = useCallback((option: boolean) => {
    setIsAuthenticated(prevState => option);
    // isAuthenticated = option;
  }, []);

  let routesObj: routeType[];
  routesObj = notAuthRoutes;
  const changeRoutes = () => {
    routesObj = isAuthenticated ? authRoutes : notAuthRoutes;
    console.log("Changing routes:");
    console.log(routesObj);
  };

  useEffect(() => {
    // useCallback(changeRoutes, [changeRoutes]);
    changeRoutes();
  }, [isAuthenticated]);
  // let routes: React.MutableRefObject<any> = useRef();
  const routes = routesObj.map((el: routeType) => (
    <Route
      key={el.path}
      path={el.path}
      exact={el.exact}
      component={el.component}
    />
  ));

  const router = <Switch>{routes}</Switch>;

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     console.log("Not Authenticated");
  //     routes.current = (
  //       <Switch>
  //         <Route path="/" exact component={HomePage} />
  //       </Switch>
  //     );
  //   } else {
  //     console.log("Authenticated");
  //     routes.current = (
  //       <Switch>
  //         <Route path="/" exact component={HomePage} />
  //       </Switch>
  //     );
  //   }
  // }, [isAuthenticated]);

  return { router, toggleIsAuthenticated };
};

export default useRouters;
