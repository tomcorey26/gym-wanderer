import React from 'react';
import { useMyAnalyticsQuery } from '@gw/controllers';
import { getAccessToken } from '../accessToken';
import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  Grid,
  Paper,
  Typography,
  Box,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  List,
} from '@material-ui/core';
import { LoaderBlock } from '../components/LoaderBlock';
import { StyledLink } from '../components/NavComponents/Navbar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  title: {
    textAlign: 'center',
  },
  boxTitle: {
    marginBottom: theme.spacing(4),
  },
  bold: {
    fontWeight: 600,
    color: 'black',
  },
  memberships: {},
  list: {},
}));

interface AnalyticsProps {}

export const Analytics: React.FC<AnalyticsProps> = ({}) => {
  const { data, loading } = useMyAnalyticsQuery();
  const history = useHistory();
  const classes = useStyles();

  if (loading) {
    return <LoaderBlock width="100vw" height="100vh" />;
  }
  if (!getAccessToken()) {
    history.push('/login');
  }

  const profit = data?.myGym?.memberships?.reduce((a, b) => a + b.payment, 0);

  console.log('data', data);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box className={classes.title}>
            <Typography variant="h1" component="h2" gutterBottom>
              Total Profit
            </Typography>
            <Typography
              variant="h3"
              component="h3"
              gutterBottom
              style={{ color: 'green' }}
            >
              ${profit ? profit : 0}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Box className={classes.boxTitle}>
              <span className={classes.bold}>{data?.myGym?.gym_name}</span>{' '}
              Membership Transactions{' '}
            </Box>
            <Box className={classes.memberships}>
              {data &&
              data.myGym &&
              data.myGym.memberships &&
              data.myGym.memberships.length !== 0 ? (
                <List dense className={classes.list}>
                  {data.myGym.memberships.map(
                    (
                      {
                        payment,
                        member: { id, first_name, last_name, photo_url },
                      },
                      i
                    ) => (
                      <AnalyticsList
                        id={id}
                        membership_length={
                          payment / Number(data.myGym?.membership_cost.slice(1))
                        }
                        payment={payment}
                        name={`${first_name} ${last_name}`}
                        photo_url={photo_url}
                        key={i}
                        profit={true}
                        forGym={false}
                      />
                    )
                  )}
                </List>
              ) : (
                <Box>
                  <h2>Your Gym Has no memberships yet</h2>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Box className={classes.boxTitle}>
              <span className={classes.bold}>My Membership</span> Transactions
            </Box>

            <Box className={classes.memberships}>
              {data && data.myMemberships && data.myMemberships.length !== 0 ? (
                <List dense className={classes.list}>
                  {data.myMemberships.map(
                    (
                      {
                        payment,
                        gym: { id, gym_name, membership_cost, photo_urls },
                      },
                      i
                    ) => (
                      <AnalyticsList
                        id={id}
                        membership_length={
                          payment / Number(membership_cost.slice(1))
                        }
                        payment={payment}
                        name={gym_name}
                        photo_url={photo_urls[0]}
                        key={i}
                        profit={false}
                        forGym={true}
                      />
                    )
                  )}
                </List>
              ) : (
                <Box>
                  <h2>You dont have any memberships</h2>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

interface AnalyticsListProps {
  payment: number;
  id: string;
  name: string;
  photo_url: string;
  membership_length?: number;
  profit: boolean;
  forGym: boolean;
}

const AnalyticsList: React.FC<AnalyticsListProps> = ({
  payment,
  name,
  id,
  photo_url,
  membership_length,
  forGym,
}) => {
  return (
    <>
      <StyledLink color="inherit" to={forGym ? `/gyms/${id}` : `/user/${id}`}>
        <ListItem button>
          <ListItemAvatar>
            <Avatar alt={name} src={photo_url} />
          </ListItemAvatar>
          <ListItemText
            primary={name}
            secondary={membership_length ? membership_length + ' Months' : ''}
          />
          <ListItemSecondaryAction>
            <Typography
              variant="h4"
              style={{ color: forGym ? 'red' : 'green' }}
            >
              {forGym ? '-' : '+'}${payment}
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
      </StyledLink>
    </>
  );
};
