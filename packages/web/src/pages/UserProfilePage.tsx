import React from 'react';
import Grid from '@material-ui/core/Grid';
import {
  makeStyles,
  Theme,
  createStyles,
  Paper,
  Typography,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { UserProfileTabs } from '../components/UserProfileTabs';
import { useParams } from 'react-router-dom';
import { useUserProfileQuery } from '@gw/controllers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '80vh',
      margin: theme.spacing(7),
    },
    userGrid: {
      height: '100%',
    },
    userProfileImg: {
      width: 320,
      height: 320,
    },
    divider: {
      width: 320,
    },
    userLeftSide: {
      marginRight: theme.spacing(4),
    },
    userRightSide: {},
    smallTitle: {
      color: '#9c27b0',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

interface UserProfilePageProps {}

export const UserProfilePage: React.FC<UserProfilePageProps> = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { data, loading } = useUserProfileQuery({
    variables: {
      userId: id ? id : '',
    },
  });

  console.log('data', data);

  if (loading) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <Grid className={classes.userGrid} container spacing={6}>
        <Grid
          className={classes.userLeftSide}
          direction="column"
          container
          item
          md={4}
          spacing={3}
        >
          <Grid item>
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
              alt="user"
              className={classes.userProfileImg}
            />
          </Grid>
          <Grid item>
            <Typography variant="overline">Gym</Typography>
            <Divider color="primary" className={classes.divider} />
          </Grid>
          <Grid item>
            {data && data.getUser && data.getUser.gym ? (
              <>
                <Typography
                  variant="h6"
                  className={classes.smallTitle}
                  gutterBottom
                >
                  Gym Name
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Location
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  variant="h6"
                  className={classes.smallTitle}
                  gutterBottom
                >
                  {data?.getUser?.first_name} Does not own a Gym
                </Typography>
              </>
            )}
          </Grid>
          <Grid item>
            <Typography variant="overline">Gym Preferences</Typography>
            <Divider color="primary" className={classes.divider} />
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              className={classes.smallTitle}
              gutterBottom
            >
              {Object.keys(data?.getUser?.preferences as object).map((p, i) => {
                if (data?.getUser?.preferences[p] === true) {
                  return (
                    <div key={i}>{p.charAt(0).toUpperCase() + p.slice(1)}</div>
                  );
                }
              })}
            </Typography>
          </Grid>
        </Grid>
        {/* half */}
        <Grid
          container
          item
          md={7}
          direction="column"
          className={classes.userRightSide}
        >
          <Grid item md={6}>
            <Typography variant="h4" color="textPrimary">
              {data?.getUser?.first_name} {data?.getUser?.last_name}
            </Typography>
            <Typography
              variant="h6"
              className={classes.smallTitle}
              style={{ marginBottom: 32 }}
            >
              Gym Owner
            </Typography>
            <Typography variant="subtitle2">
              <div>Gym Rating</div>
              <Rating value={3} readOnly />
            </Typography>
          </Grid>

          <Grid item>
            <UserProfileTabs />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
