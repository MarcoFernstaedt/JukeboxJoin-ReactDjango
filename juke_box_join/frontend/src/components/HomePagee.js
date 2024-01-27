import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import PageNotFound from "./PageNotFound";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";

const HomePagee = () => {
  return (
    <Routes>
      {/* Home page route */}
      <Route
        path="/"
        element={
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="h3" component="h3">
                Jukebox Join
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <ButtonGroup disableElevation variant="contained">
                <Button color="primary" to="/join" component={Link}>
                  Join Room
                </Button>
                <Button color="secondary" to="/create" component={Link}>
                  Create Room
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        }
      />
      {/* Other Routes */}
      <Route path="/join" element={<RoomJoinPage />} />
      <Route path="/create" element={<CreateRoomPage />} />
      <Route path="/room/:roomCode" element={<Room />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default HomePagee;
