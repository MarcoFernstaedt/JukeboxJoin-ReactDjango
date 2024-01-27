import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const CreateRoomPage = () => {
  const [guestCanPause, setGuestCanPause] = useState(true);
  const defaultVotes = 2;
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const navagate = useNavigate();

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
        guest_can_pause: guestCanPause,
        votes_to_skip: votesToSkip,
      }),
    };

    fetch("/api/create-room", requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        navagate(`/room/${data.code}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography component="h4" variant="h4">
          Create A Room
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <FormControl component="fieldset">
          <FormHelperText sx={{ textAlign: "center" }}>
            Guest Control of Playback State
          </FormHelperText>
          <RadioGroup
            row
            defaultValue="true"
            onChange={_handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
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
          onClick={_handleCreateRoomButton}
        >
          Create A Room
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateRoomPage;
