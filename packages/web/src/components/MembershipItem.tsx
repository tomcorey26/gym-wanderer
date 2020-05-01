import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { GymTypes } from '@gw/controllers';
import { StyledLink } from './NavComponents/Navbar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

interface MembershipItemProps {
  id: string;
  gym_name: string;
  location: string;
  type: GymTypes;
  photo_urls: string[];
}

export const MembershipItem: React.FC<MembershipItemProps> = ({
  id,
  gym_name,
  location,
  type,
  photo_urls,
}) => {
  const classes = useStyles();

  return (
    <StyledLink to={`/gyms/${id}`} color="black">
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={photo_urls[0]} />
          </ListItemAvatar>
          <ListItemText
            primary={gym_name}
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
                {' — '}
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </StyledLink>
  );
};
