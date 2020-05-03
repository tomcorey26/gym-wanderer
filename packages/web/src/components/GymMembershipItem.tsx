import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
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

interface GymMembershipItemProps {
  id: string;
  first_name: string;
  last_name: string;
  photo_url: string;
}

export const GymMembershipItem: React.FC<GymMembershipItemProps> = ({
  id,
  first_name,
  last_name,
  photo_url,
}) => {
  const classes = useStyles();

  return (
    <StyledLink to={`/user/${id}`} color="black">
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={photo_url} />
          </ListItemAvatar>
          <ListItemText
            primary={first_name + ' ' + last_name}
            secondary={
              <React.Fragment>
                {/* <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {last_name}
                </Typography> */}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </StyledLink>
  );
};
