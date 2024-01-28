import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import PageNotFound from "./PageNotFound";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";

const HomePagee = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/check-room")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to fetch room data");
        }
      })
      .then((data) => {
        if (data && data.code) {
          navigate(`/room/${data.code}`);
        }
      })
      .catch((err) => {
        console.error("Error", err);
      });
  }, [navigate]);

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
