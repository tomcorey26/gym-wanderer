import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateTimePicker } from '@material-ui/pickers';
import {
  Box,
  makeStyles,
  Theme,
  createStyles,
  Paper,
  Typography,
  Divider,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from '@material-ui/core';
import moment from 'moment';
// import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
  useJoinGymMutation,
  MeDocument,
  useUserMembershipsInfoQuery,
  UserMembershipsInfoDocument,
} from '@gw/controllers';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: 18,
      padding: theme.spacing(2),
      maxHeight: 600,
      width: 300,
      position: 'sticky',
      top: 20,
    },
    topSpace: {
      marginTop: 10,
    },
    formHeader: {
      height: '20%',
    },
    formBody: {
      height: '80%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    inputLine: {},
    date: {},
    reserveButton: {
      cursor: 'pointer',
      width: 250,
    },
  })
);

interface GymReservationFormProps {
  membership_cost?: string;
  gymId?: string;
}

const GymReservationForm: React.FC<GymReservationFormProps> = ({
  membership_cost,
  gymId,
}) => {
  const [monthCount, setMonthCount] = useState<number>(1);
  const [auto_renewal, setAutorenewal] = useState<any>(false);
  const [newMemberText, setNewMemberText] = useState<string>('');
  const [joinGym] = useJoinGymMutation();
  const { data, loading, error } = useUserMembershipsInfoQuery();
  const history = useHistory();

  const classes = useStyles();

  const getDate = (monthsFromNow = 0) => (
    <span>
      {moment().add(monthsFromNow, 'months').month() + 1}/
      {moment().add(monthsFromNow, 'months').date()}/
      {moment().add(monthsFromNow, 'months').year()}
    </span>
  );

  const handleJoin = async () => {
    if (!gymId) return;
    // if error that menas user is not auth
    if (error) {
      history.push('/register');
      return;
    }
    setNewMemberText('Thank you For Joining!');
    if (monthCount >= 1) {
      await joinGym({
        variables: {
          auto_renewal,
          gymId,
          end_date: moment().add(monthCount, 'months').seconds(),
        },
        refetchQueries: [
          { query: UserMembershipsInfoDocument },
          { query: MeDocument },
        ],
      });
    }
  };

  useEffect(() => {
    if (!newMemberText) return;
    setTimeout(() => {
      setNewMemberText('');
    }, 2000);
  }, [newMemberText]);

  if (loading) {
    return (
      <Paper
        className={classes.paper}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Paper>
    );
  }

  let membership;
  if (data && data.myMemberships) {
    membership = data?.myMemberships.find(
      (gym) => gym.myGymMemberships.id === gymId
    );
  }

  if (data && data.myMemberships && membership) {
    return (
      <Paper
        className={classes.paper}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: 400,
        }}
      >
        <h2>{newMemberText}</h2>
        <h1>Membership id :</h1>
        <h2>{membership.memberId}</h2>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <Box className={classes.formHeader}>
        <Typography gutterBottom variant="h5">
          <Box fontWeight={500}>
            Reserve a Time{' '}
            <Typography variant="subtitle1">{membership_cost}/month</Typography>
          </Box>
        </Typography>
        <Divider />
      </Box>
      {/* <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              label="Select Date and Time"
              inputVariant="outlined"
              value={date}
              onChange={setDate}
            />
          </MuiPickersUtilsProvider> */}
      <Box className={classes.formBody}>
        <TextField
          id="outlined-number"
          label="# of Months"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={monthCount}
          onChange={(e) => setMonthCount(Number(e.target.value))}
          InputProps={{ inputProps: { min: 1 } }}
        />
        <Box className={classes.date}>
          <h1>Start date</h1>
          <Typography variant="h4" color="textSecondary">
            {getDate()}
          </Typography>
        </Box>

        <Box className={classes.date}>
          <h1>End date</h1>
          <Typography variant="h4" color="textSecondary">
            {getDate(monthCount)}
          </Typography>
        </Box>

        <Box className={classes.inputLine}>
          <FormControlLabel
            control={
              <Checkbox
                checked={auto_renewal}
                onChange={() => setAutorenewal((renew) => !renew)}
                name="checkedA"
              />
            }
            label="Auto Renewal"
          />
          <Button
            className={classes.reserveButton}
            variant="contained"
            color="secondary"
            onClick={handleJoin}
          >
            Join Gym
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
export default GymReservationForm;
