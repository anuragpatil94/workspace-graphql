import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";

import App from "./components/App";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";

const client = new ApolloClient({});

const Root = () => {
  return (
    <div className="container">
      <ApolloProvider client={client}>
        <HashRouter>
          <Switch>
            {/* <Route path="/" component={App}></Route> */}
            <Route path="/" component={() => <SongList />} exact></Route>
            <Route
              path="/song/new"
              component={() => <SongCreate />}
              exact
            ></Route>
          </Switch>
        </HashRouter>
      </ApolloProvider>
    </div>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
