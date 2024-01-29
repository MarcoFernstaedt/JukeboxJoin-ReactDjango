import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

const SettingsPage = () => {
  const [guestCanPause, setGuestCanPause] = useState(true);
  const defaultVotes = 2;
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const location = useLocation();
  const roomCode = location.state.roomCode;
  const isUpdateMode = !!roomCode;
  const navigate = useNavigate();
  const _handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
  };

  const _handleGuestCanPauseChange = (e) => {
    setGuestCanPause(e.target.value === "true" ? true : false);
  };

  const _handleCreateRoomButton = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: roomCode,
        guest_can_pause: guestCanPause,
        votes_to_skip: votesToSkip,
      }),
    };

    fetch("/api/create-room", requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // return res.text().then((text) => {
        //   throw new Error(text);
        // });
      })
      .then((data) => {
        navigate(`/room/${data.code}`);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

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
        console.error("Error", err);
      });
  };

  const _handleUpdateSettings = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode, // Add this line to include the room code
        guest_can_pause: guestCanPause,
        votes_to_skip: votesToSkip,
      }),
    };

    fetch("/api/update-room", requestOptions)
      .then((res) => {
        if (res.ok) {
          // navigate(`/room/${roomCode}`);
          return res.json();
        } else {
          throw new Error("Bad Request");
        }
      })
      .then((data) => {
        setGuestCanPause(data.guest_can_pause);
        setVotesToSkip(data.votes_to_skip);
        navigate(`/room/${roomCode}`);
      })
      .catch((err) => {
        console.error("Error", err);
      });
  };

  useEffect(() => {
    if (roomCode) {
      getRoomDetails();
    }
  }, [roomCode]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography component="h4" variant="h4">
          {isUpdateMode ? "Settings" : "Create A Room"}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <FormControl component="fieldset">
          <FormHelperText sx={{ textAlign: "center" }}>
            Guest Control of Playback State
          </FormHelperText>
          <RadioGroup
            row
            value={String(guestCanPause)}
            defaultValue="true"
            onChange={_handleGuestCanPauseChange}
          >
            <FormControlLabel
              value='true'
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value='false'
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <FormControl>
          <TextField
            required={true}
            type="number"
            defaultValue={defaultVotes}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
            onChange={_handleVotesChange}
          />
          <FormHelperText sx={{ textAlign: "center" }}>
            Votes Required to Skip Song
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Button
          color="primary"
          variant="contained"
          onClick={
            isUpdateMode ? _handleUpdateSettings : _handleCreateRoomButton
          }
        >
          {isUpdateMode ? "Update" : "Create A Room"}
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Button color="secondary" variant="contained" to="/" component={Link}>
          {isUpdateMode ? "Cancel" : "Back"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SettingsPage;
