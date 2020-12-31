import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { isAuthRoutes, isNotAuthRoutes } from "./router/router";
import { checkSession } from "./store/actions/authAction";

import useRouters from "./hooks/router-hook";
import Layout from "./hoc/Layout/Layout";
import Spinner from "./components/ui/Spinner/Spinner";
// const isAuth = false;

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(checkSession());
    setIsReady(true);
  }, []);

  const { router, toggleIsAuthenticated } = useRouters(
    isAuthRoutes,
    isNotAuthRoutes
  );

  const auth: IAuthState = useSelector((state: IStore) => state.auth);

  console.log("@@@@@@@AUTH");
  console.log(auth);

  // const routes = (
  //   <Switch>
  //     <Route path="/" exact component={HomePage} />
  //   </Switch>
  // );
  // const isAuth = false;

  useEffect(() => {
    if (auth.token) {
      toggleIsAuthenticated(true);
      history.push("/");
    } else {
      toggleIsAuthenticated(false);
      history.push("/");
    }
  }, [auth.token]);

  console.log("@@@@ROUTES");
  console.log(router);

  // const routes = router.map((el: routeType) => (
  //   <Route
  //     key={el.path}
  //     path={el.path}
  //     exact={el.exact}
  //     component={el.component}
  //   />
  // ));

  // const routes = router(false);
  let content;
  if ((auth && auth.loading) || !isReady) {
    content = (
      <div>
        <Layout>
          <Spinner />
        </Layout>
      </div>
    );
  } else {
    content = (
      <div>
        <Layout>
          <React.Suspense fallback={<Spinner />}>
            {!auth ? <Spinner /> : <Switch>{router}</Switch>}
          </React.Suspense>
        </Layout>
      </div>
    );
  }

  console.log("STATE");
  console.log(auth);
  return content;
};

export default App;
