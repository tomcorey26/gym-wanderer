import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { SearchContext } from '../context/SearchState';
import { Gyms } from '@gw/controllers';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
  title: {
    fontSize: '1rem',

    fontWeight: 500,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2rem',
      fontWeight: 500,
    },
  },
  avatarItem: {
    height: '90%',
    width: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '64%',
    height: '72%',

    [theme.breakpoints.down('xs')]: {
      width: '60%',
      height: '50%',
    },
  },
  item: {
    height: '300px',
    [theme.breakpoints.down('xs')]: {
      height: 200,
    },
  },
  hover: {
    height: '300px',
    background: 'grey',
  },
}));

interface SideScrollerBoxProps {
  onClick: () => void;
}

const SideScrollerBox: React.FC<Gyms & SideScrollerBoxProps> = ({
  id,
  gym_name,
  location,
  membership_cost,
  type,
  photo_urls,
  onClick,
  reviews,
}) => {
  const classes = useStyles();
  const { dispatch, hoveredGymId } = useContext(SearchContext);

  return (
    <>
      <ListItem
        button
        className={hoveredGymId === id ? classes.hover : classes.item}
        alignItems="center"
        onMouseLeave={() =>
          dispatch({ type: 'UPDATE_HOVERED_GYM_ID', hoveredGymId: 0 })
        }
        onMouseOver={() =>
          dispatch({ type: 'UPDATE_HOVERED_GYM_ID', hoveredGymId: id })
        }
        onClick={onClick}
      >
        <ListItemAvatar className={classes.avatarItem}>
          <Avatar
            className={classes.avatar}
            alt="Gym Pic"
            src={photo_urls[0]}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              component="span"
              variant="body2"
              className={classes.title}
              color="textPrimary"
            >
              {gym_name}
            </Typography>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {location}
              </Typography>
            </React.Fragment>
          }
        />
        <ListItemText
          primary={
            reviews
              ? `Rating • ${reviews.reduce((a, b) => a + b.rating, 0)} Stars`
              : 'No Reviews'
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {membership_cost} / hour
              </Typography>{' '}
              {type}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default React.memo(SideScrollerBox);
