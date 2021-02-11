import { hot } from "react-hot-loader/root";
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "utils/theme";
import Login from "routes/login";
import ChatRoom from "routes/chat";
import UIShowcase from "routes/ui";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/chat">
            <ChatRoom />
          </Route>
          <Route path="/ui">
            <UIShowcase />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

const AppHot = hot(App);

ReactDOM.render(<AppHot />, document.getElementById("root"));
