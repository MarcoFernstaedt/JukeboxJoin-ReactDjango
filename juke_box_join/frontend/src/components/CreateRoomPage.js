import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const CreateRoomPage = () => {
  const defaultVotes = 2;

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
          <RadioGroup row defaultValue="true">
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
          <TextField required={true} type='number' defaultValue={defaultVotes} inputProps={{
            min: 1,
            style: {textAlign: 'center'}
          }} />
          <FormHelperText sx={{ textAlign: "center" }}>
            Votes Required to Skip Song
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Button color='primary' variant='contained' >Create A Room</Button>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Button color='secondary' variant='contained' to='/' component={Link} >Back</Button>
      </Grid>
    </Grid>
  );
};

export default CreateRoomPage;
