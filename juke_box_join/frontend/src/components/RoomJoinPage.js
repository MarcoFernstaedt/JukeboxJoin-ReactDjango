import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography } from "@mui/material";

const RoomJoinPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const _handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
  };

  const _handleRoomJoin = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((res) => {
        if (res.ok) {
          navigate(`/room/${roomCode}`);
        } else {
          setError({ error: "Room Not Found" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography component="h4" variant="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <TextField
          error={error !== ""}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          onChange={_handleTextFieldChange}
          helperText={error.message}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Button variant="contained" color="primary" onClick={_handleRoomJoin}>
          Join Room
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default RoomJoinPage;
