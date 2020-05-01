import React, { useState } from 'react';
import { Grid, Typography, Box, Divider, Chip, List } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import Avatar from '@material-ui/core/Avatar';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Coords } from '../types/Coords';
import Maybe from 'graphql/tsutils/Maybe';
import { Reviews, User } from '@gw/controllers';
import { ReviewItem } from './ReviewItem';
import { StyledLink } from './NavComponents/Navbar';
import { ReviewCreate } from './ReviewCreate';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      width: '70%',
      // maxWidth: 900,
    },
    topSpace: {
      marginTop: 10,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: theme.spacing(0.5),
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    description: {
      padding: 10,
      marginBottom: theme.spacing(3),
    },
    space: {
      minHeight: 600,
    },
    spaceBetween: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    reviewList: {
      width: '100%',
      height: 320,
      overflow: 'auto',
    },
    block: {
      marginBottom: 8,
    },
  })
);

interface GymDescriptionProps {
  gym_name?: string;
  description?: string;
  membership_cost?: string;
  location?: string;
  coordinates?: Coords;
  type?: string;
  loading?: boolean;
  owner?: {
    first_name: string;
    last_name: string;
    email: string;
    owner_photo_url: string;
    owner_id: string;
  };
  equipment?: string[];
  reviews: Maybe<
    Array<
      {
        __typename?: 'Reviews';
      } & Pick<Reviews, 'rating' | 'text' | 'date_created'> & {
          creator: {
            __typename?: 'User';
          } & Pick<User, 'id' | 'first_name' | 'last_name' | 'photo_url'>;
        }
    >
  >;
  currentUserId: string;
  gymId: string;
}

const GymDescription: React.FC<GymDescriptionProps> = ({
  owner,
  coordinates,
  description,
  gym_name,
  location,
  membership_cost,
  type,
  equipment,
  reviews,
  currentUserId,
  gymId,
}) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Box className={classes.spaceBetween}>
                  <Typography gutterBottom variant="h3">
                    <Box fontWeight={500}>
                      {gym_name} ({type})
                    </Box>
                  </Typography>
                  <Typography gutterBottom variant="h5">
                    <StyledLink to={`/user/${owner?.owner_id}`} color="black">
                      <Box fontWeight={400}>
                        <Avatar alt="Remy Sharp" src={owner?.owner_photo_url} />
                        {owner?.first_name}{' '}
                        <Box fontWeight={200} fontSize={16}>
                          {owner?.email}
                        </Box>
                      </Box>
                    </StyledLink>
                  </Typography>
                </Box>
                <Typography gutterBottom variant="h5">
                  <Box fontWeight={200}>{location}</Box>
                </Typography>
                <Typography variant="h6" gutterBottom>
                  <Box fontWeight={500}>
                    {membership_cost}/Month{' '}
                    <span style={{ fontWeight: 20 }}>per person</span>
                  </Box>
                  <Box className={classes.topSpace}>
                    {reviews && reviews.length > 0 ? (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Rating
                          name="simple-controlled"
                          readOnly
                          value={
                            reviews.reduce((a: number, b) => a + b.rating, 0) /
                            reviews?.length
                          }
                        />
                        <div style={{ marginLeft: 8 }}>
                          ({reviews.length} reviews)
                        </div>
                      </div>
                    ) : (
                      <div>no reviews</div>
                    )}
                  </Box>
                </Typography>
                <Box className={classes.chips}>
                  {equipment &&
                    equipment.map((equip, i) => {
                      let icon = <FitnessCenterIcon />;

                      // if (data.label === 'React') {
                      //   icon = <TagFacesIcon />;
                      // }

                      return (
                        <Chip
                          key={i}
                          icon={icon}
                          label={equip}
                          className={classes.chip}
                        />
                      );
                    })}
                </Box>
              </Grid>

              <Typography variant="overline">Description</Typography>
              <Divider />

              <Grid item style={{ padding: 0 }}>
                <Box className={classes.description}>{description}</Box>

                <Typography variant="overline">Reviews</Typography>
                <Divider />
                <Box className={classes.space}>
                  {reviews &&
                    !reviews?.find(
                      (rev) => rev.creator.id === currentUserId
                    ) && <ReviewCreate gymId={gymId} />}
                  {!reviews || reviews.length === 0 ? (
                    <div>
                      <h1>No Reviews </h1>
                    </div>
                  ) : (
                    <List className={classes.reviewList}>
                      {reviews.map(({ creator, rating, text }, i) => (
                        <ReviewItem
                          createdByMe={creator.id === currentUserId}
                          user={creator}
                          rating={rating}
                          text={text}
                          key={i}
                        />
                      ))}
                    </List>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default GymDescription;
