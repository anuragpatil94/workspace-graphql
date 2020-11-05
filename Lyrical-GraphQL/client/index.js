import "./style/style.css";

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";

import history from "./history";
const client = new ApolloClient({});

const Root = () => {
  return (
    <div className="container">
      <ApolloProvider client={client}>
        <Router history={history}>
          <Switch>
            <Route path="/" component={SongList} exact></Route>
            <Route path="/songs/new" component={SongCreate} exact></Route>
            <Route path="/songs/:id" component={SongDetail} exact></Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
