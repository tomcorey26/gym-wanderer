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

  if (!data) {
    return (
      <div>
        <h1>User not found</h1>
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
              src={
                data.getUser && data.getUser.photo_url
                  ? data.getUser.photo_url
                  : 'https://robohash.org/423'
              }
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
                  {data?.getUser?.first_name} does not own a Gym
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
              {data &&
                Object.keys(data?.getUser?.preferences as object).map(
                  (p, i) => {
                    if (data?.getUser?.preferences[p] === true) {
                      return (
                        <div key={i}>
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </div>
                      );
                    }
                    return null;
                  }
                )}
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
              {data?.getUser?.gym && 'Gym Owner'}
              {data?.getUser?.gym && data.userMemberships?.length !== 0 && '/'}
              {data.userMemberships?.length !== 0 && 'Member'}
              {!data?.getUser?.gym && !data.userMemberships?.length && 'User'}
            </Typography>
            {/* <Typography variant="subtitle2" gutterBottom>
              <div>Gym Rating</div>
              <Rating value={3} readOnly />
            </Typography> */}
            <Typography variant="subtitle2">
              <div>Average review rating</div>
            </Typography>
            {data.userReviews && data.userReviews.length ? (
              <Rating
                value={
                  data.userReviews?.reduce((a: number, b) => a + b.rating, 0) /
                  data.userReviews?.length
                }
                readOnly
              />
            ) : (
              <Typography variant="subtitle1">User has no reviews</Typography>
            )}
          </Grid>

          <Grid item>
            <UserProfileTabs
              memberships={data.userMemberships}
              reviews={data.userReviews}
              about={{
                email: data.getUser?.email,
                birthday: data.getUser?.birthday,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
