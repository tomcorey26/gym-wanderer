import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Gyms, Maybe, Reviews } from '@gw/controllers';
import { List } from '@material-ui/core';
import { ReviewItem } from './ReviewItem';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  reviewList: {
    width: '100%',
    height: 180,
    overflow: 'auto',
  },
}));

interface UserProfileTabsProps {
  memberships: Maybe<
    ({ __typename?: 'Membership' | undefined } & {
      gym: { __typename?: 'Gyms' | undefined } & Pick<
        Gyms,
        'id' | 'location' | 'type' | 'gym_name'
      >;
    })[]
  >;
  reviews: Maybe<
    ({
      __typename?: 'Reviews' | undefined;
    } & Pick<Reviews, 'text' | 'rating'> & {
        gym: {
          __typename?: 'Gyms' | undefined;
        } & Pick<Gyms, 'id' | 'gym_name'>;
      })[]
  >;
  about: any;
}
export const UserProfileTabs: React.FC<UserProfileTabsProps> = ({
  reviews,
  about,
  memberships,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="About" {...a11yProps(0)} />
          <Tab label="Reviews" {...a11yProps(1)} />
          <Tab label="Memberships" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Typography component="div" variant="h5">
            Email: {about.email}
          </Typography>
          <Typography component="div" variant="h5">
            Birthday: {about.birthday}
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {!reviews ? (
            <div>
              <h1>No Reviews Created by this user</h1>
            </div>
          ) : (
            <List className={classes.reviewList}>
              {reviews.map(({ gym, rating, text }, i) => (
                <ReviewItem gym={gym} rating={rating} text={text} key={i} />
              ))}
            </List>
          )}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {!memberships ? (
            <div>
              <h1>No memberships Found</h1>
            </div>
          ) : (
            memberships.map(({ gym: { gym_name, id, location, type } }, i) => (
              <div key={i}>
                {id}
                {gym_name}
                {location}
                {type}
              </div>
            ))
          )}
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};
