import React from 'react';
import Container from '@material-ui/core/Container';
import MapsAutoComplete from '../components/MapsAutoComplete';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      marginTop: '5rem',
    },
    secondary: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
    },
    item: {
      marginBottom: '0.5rem',
    },
  })
);

interface HomeProps {}

//when the call to action is clicked
//we want to be redirected to the search page

const Home: React.FC<HomeProps> = () => {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.main} maxWidth="xl">
        <Container className={classes.secondary}>
          <Typography className={classes.item} variant="h4" component="h2">
            Reserve times for personal Gyms anywhere in the World
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            className={classes.item}
            color="textSecondary"
            gutterBottom
          >
            Search for gyms to book your workouts
          </Typography>
          <MapsAutoComplete />
        </Container>
      </Container>
    </>
  );
};

export default Home;
