import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {
  Gyms,
  User,
  useDeleteReviewMutation,
  GymDetailsDocument,
} from '@gw/controllers';
import Rating from '@material-ui/lab/Rating';
import { StyledLink } from './NavComponents/Navbar';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { LoaderBlock } from './LoaderBlock';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
  item: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    // [theme.breakpoints.down('sm')]: {
    //   width: '100vw',
    // },
  },
  itemBody: {
    display: 'flex',
  },
  reviewText: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(1),
    alignSelf: 'flex-start',
  },
  modifyButtons: {
    position: 'absolute',
    right: 21,
  },
}));

interface ReviewItemProps {
  id?: number;
  gym?: {
    __typename?: 'Gyms' | undefined;
  } & Pick<Gyms, 'id' | 'gym_name'>;
  user?: {
    __typename?: 'User' | undefined;
  } & Pick<User, 'id' | 'first_name' | 'last_name' | 'photo_url'>;
  rating: number;
  text: string;
  createdByMe: boolean;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({
  gym,
  rating,
  text,
  user,
  createdByMe,
  id,
}) => {
  const classes = useStyles();
  const [deleteReview, { loading }] = useDeleteReviewMutation();
  const history = useHistory();

  const deleteThisReview = async () => {
    await deleteReview({
      variables: { reviewId: id ? id : 0 },
    });
    window.location.reload();
  };

  if (loading) {
    return <LoaderBlock />;
  }
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
      <div>
        <ListItem
          className={classes.item}
          alignItems="flex-start"
          style={createdByMe ? { border: '1px solid #9c27b0' } : {}}
        >
          {!gym && (
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={entity.photo_url} />
            </ListItemAvatar>
          )}
          <div>
            <ListItemText
              onClick={() =>
                history.push(gym ? `/gyms/${entity.id}` : `/user/${entity.id}`)
              }
              style={{ cursor: 'pointer' }}
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
          {user && (
            <div className={classes.modifyButtons}>
              <Button
                color="secondary"
                variant="contained"
                onClick={deleteThisReview}
              >
                <DeleteIcon />
              </Button>
            </div>
          )}
        </ListItem>
      </div>
    </>
  );
};
