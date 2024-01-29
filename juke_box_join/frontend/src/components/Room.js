import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";

const Room = () => {
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [votesToSkip, setVotesToSkip] = useState(0);
  const [isHost, setIsHost] = useState(false);
  const navigate = useNavigate();

  const { roomCode } = useParams();

  const getRoomDetails = () => {
    fetch(`/api/get-room?code=${roomCode}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Bad Request");
      })
      .then((data) => {
        setGuestCanPause(data.guest_can_pause);
        setVotesToSkip(data.votes_to_skip);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const _handleLeaveRoom = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/api/leave-room", requestOptions).then((res) => {
      if (res.ok) {
        navigate("/");
      }
    });
  };

  const _handleOpenSettings = () => {
    navigate("/settings", { state: { roomCode: roomCode } });
  };

  useEffect(() => {
    getRoomDetails();
    fetch("/api/is-host")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Responce Failed");
        }
      })
      .then((data) => {
        if (data && data.host) {
          setIsHost(data.host);
        }
      })
      .catch((err) => {
        console.error("Error", err);
      });
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography varient="h6" component="h6">
          Host: {String(isHost)}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography varient="h6" component="h6">
          Guest can Can Pause: {String(guestCanPause)}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography varient="h6" component="h6">
          Votes To Skip: {String(votesToSkip)}
        </Typography>
      </Grid>
      {isHost && (
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Button color="primary" onClick={_handleOpenSettings}>
            Settings
          </Button>
        </Grid>
      )}
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Button color="secondary" onClick={_handleLeaveRoom}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
};

export default Room;
