import React from "react";
import { Routes, Route, Link, Redirect, useRouteMatch } from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";

const HomePagee = () => {
  // let match = useRouteMatch();

  return (
    <Routes>
      {/* Routes  */}
      <Route path='/join' element={<RoomJoinPage />} />
      <Route path='/create' element={<CreateRoomPage />} />
      {/* home page route */}
      <Route path="/" element={<p>Welcome to the Home Page!</p>} />
    </Routes>
  );
};

export default HomePagee;
