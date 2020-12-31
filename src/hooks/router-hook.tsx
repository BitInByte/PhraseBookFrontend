// Import Libraries
import React, { useCallback, useEffect, useState, useRef } from "react";
import { Route } from "react-router-dom";

// Import components
// import HomePage from "../pages/HomePage";

// import { isAuthRoutes, isNotAuthRoutes } from "../router/router";

// Interface
export type routeType = {
  path: string;
  exact: boolean;
  component: React.FC;
};
//
// const useRouters = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [router, setRouter] = useState(null);
//   // let isAuthenticated = false;
//   const authRoutes = isAuthRoutes;
//   const notAuthRoutes = isNotAuthRoutes;
//   console.log(isAuthenticated);
//
//   const toggleIsAuthenticated = useCallback((option: boolean) => {
//     setIsAuthenticated(prevState => option);
//     // isAuthenticated = option;
//   }, []);
//
//   let routesObj: routeType[];
//   routesObj = notAuthRoutes;
//   const changeRoutes = () => {
//     routesObj = isAuthenticated ? authRoutes : notAuthRoutes;
//     console.log("Changing routes:");
//     console.log(routesObj);
//   };
//
//   useEffect(() => {
//     // useCallback(changeRoutes, [changeRoutes]);
//     changeRoutes();
//   }, [isAuthenticated]);
//   // let routes: React.MutableRefObject<any> = useRef();
//   const routes = routesObj.map((el: routeType) => (
//     <Route
//       key={el.path}
//       path={el.path}
//       exact={el.exact}
//       component={el.component}
//     />
//   ));
//
//   setRouter(<Switch>{routes}</Switch>);
//
//   // useEffect(() => {
//   //   if (!isAuthenticated) {
//   //     console.log("Not Authenticated");
//   //     routes.current = (
//   //       <Switch>
//   //         <Route path="/" exact component={HomePage} />
//   //       </Switch>
//   //     );
//   //   } else {
//   //     console.log("Authenticated");
//   //     routes.current = (
//   //       <Switch>
//   //         <Route path="/" exact component={HomePage} />
//   //       </Switch>
//   //     );
//   //   }
//   // }, [isAuthenticated]);
//
//   return { router, toggleIsAuthenticated };
// };

// const authRoutes = isAuthRoutes;
// const notAuthRoutes = isNotAuthRoutes;

const useRouters = (authRoutes: routeType[], notAuthRoutes: routeType[]) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [router, setRouter] = useState<undefined | JSX.Element[]>(undefined);

  const toggleIsAuthenticated = useCallback((option: boolean) => {
    setIsAuthenticated(_ => option);
    // isAuthenticated = option;
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const routes = routeCreate(authRoutes);
      // setRouter(authRoutes);
      setRouter(routes);
    } else {
      // setRouter(notAuthRoutes);
      const routes = routeCreate(notAuthRoutes);
      // setRouter(authRoutes);
      setRouter(routes);
    }
  }, [isAuthenticated]);

  return { router, toggleIsAuthenticated };
};

const routeCreate = (routes: routeType[]) => {
  return routes.map((el: routeType) => (
    <Route
      key={el.path}
      path={el.path}
      exact={el.exact}
      component={el.component}
    />
  ));
};

export default useRouters;
