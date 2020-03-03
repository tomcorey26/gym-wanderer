import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateTimePicker } from "@material-ui/pickers";
import {
  Box,
  makeStyles,
  Theme,
  createStyles,
  Paper,
  Typography,
  Divider,
  TextField,
  Button
} from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: 18,
      padding: theme.spacing(2),
      maxHeight: 400,
      width: 300,
      position: "sticky",
      top: 20
    },
    topSpace: {
      marginTop: 10
    },
    inputArea: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 10
    },
    inputLine: {
      marginTop: 30
    },
    reserveButton: {
      cursor: "pointer",
      width: 250
    }
  })
);
{
  /* <Typography gutterBottom variant="caption">
          <Box fontWeight={500}>Select Date</Box>
        </Typography>
        <SingleDatePicker
          date={date}
          onDateChange={date => setDate(date)}
          focused={focused}
          onFocusChange={({ focused }) => setFocused(focused)}
          id="fart"
        /> */
}
{
  /* <Typography gutterBottom variant="caption">
          <Box fontWeight={500}>Select Time</Box>
        </Typography> */
}
interface GymReservationFormProps {}

const GymReservationForm: React.FC<GymReservationFormProps> = () => {
  const [date, setDate] = useState<any>(new Date().getDate());
  // const [time, setTime] = useState<any>();j
  // const [focused, setFocused] = useState<any>(null);

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography gutterBottom variant="h5">
        <Box fontWeight={500}>Reserve a Time</Box>
      </Typography>
      <Divider />
      <Box className={classes.inputArea}>
        <Box className={classes.inputLine}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              label="Select Date and Time"
              inputVariant="outlined"
              value={date}
              onChange={setDate}
            />
          </MuiPickersUtilsProvider>
        </Box>

        <Box className={classes.inputLine}>
          <TextField
            id="outlined-number"
            label="Guests"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />
        </Box>

        <Box className={classes.inputLine}>
          <Button
            className={classes.reserveButton}
            variant="contained"
            color="secondary"
          >
            Reserve Gym
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
export default GymReservationForm;
