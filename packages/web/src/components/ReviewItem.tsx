import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Gyms, User } from '@gw/controllers';
import Rating from '@material-ui/lab/Rating';
import { StyledLink } from './NavComponents/Navbar';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
  item: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  itemBody: {
    display: 'flex',
  },
  reviewText: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(1),
    alignSelf: 'flex-start',
  },
}));

interface ReviewItemProps {
  gym?: {
    __typename?: 'Gyms' | undefined;
  } & Pick<Gyms, 'id' | 'gym_name'>;
  user?: {
    __typename?: 'User' | undefined;
  } & Pick<User, 'id' | 'first_name' | 'last_name' | 'photo_url'>;
  rating: number;
  text: string;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({
  gym,
  rating,
  text,
  user,
}) => {
  const classes = useStyles();

  let entity: any;
  if (user) {
    entity = user;
  } else if (gym) {
    entity = gym;
  } else {
    throw Error('You cant pass both gym and user');
  }
  return (
    <>
      <StyledLink
        to={gym ? `/gyms/${entity.id}` : `/user/${entity.id}`}
        color="black"
      >
        <ListItem className={classes.item} alignItems="flex-start">
          {!gym && (
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={entity.photo_url} />
            </ListItemAvatar>
          )}
          <div>
            <ListItemText
              primary={
                gym
                  ? `Gym: ${entity.gym_name}`
                  : `${entity.first_name} ${entity.last_name}`
              }
              secondary={
                <>
                  <Rating
                    name="read-only"
                    value={rating}
                    readOnly
                    size="small"
                  />
                </>
              }
            />
          </div>
          <div className={classes.reviewText}>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            ></Typography>
            {`  ${text} `}
          </div>
        </ListItem>
      </StyledLink>
    </>
  );
};
