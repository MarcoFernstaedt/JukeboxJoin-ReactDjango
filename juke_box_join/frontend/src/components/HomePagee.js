import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";

const HomePagee = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <p>Welcome to the Home Page!</p>
        </Route>
        <Route path="/join" Component={RoomJoinPage} />
        <Route path="/create" Component={CreateRoomPage} />
      </Switch>
    </Router>
  );
};

export default HomePagee;
