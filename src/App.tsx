import React, { useCallback, useEffect } from "react";
// import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
// import HomePage from "./pages/HomePage";

import useRouters from "./hooks/router-hook";

import { Switch } from "react-router-dom";

const isAuth = false;

const App = () => {
  const { router, toggleIsAuthenticated } = useRouters();

  // const routes = (
  //   <Switch>
  //     <Route path="/" exact component={HomePage} />
  //   </Switch>
  // );
  // const isAuth = false;

  useEffect(() => {
    if (!isAuth) {
      // @ts-ignore
      toggleIsAuthenticated(false);
    }
  }, [isAuth]);

  // const routes = router(false);

  return (
    <div>
      <Layout>
        <Switch>{router}</Switch>
      </Layout>
    </div>
  );
};

export default App;
