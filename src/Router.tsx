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
          <Route path="/Search">
            <Search />
          </Route>
          <Route path="/Series">
            <Series />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Router;
