import { BrowserRouter, Switch, Route } from "react-router-dom";
import Search from "./Routes/Search";
import Series from "./Routes/Series";
import Home from "./Routes/Home";
import Nav from "./components/Nav";
function Router() {
  return (
    <>
      <BrowserRouter basename="/react_challenge3/">
        <Nav />
        <Switch>
          <Route path={["/search", "/search/:clickId"]}>
            <Search />
          </Route>
          <Route path={["/series", "/series/:seriesId"]}>
            <Series />
          </Route>
          <Route path={["/", "/movie/:movieId"]}>
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Router;
