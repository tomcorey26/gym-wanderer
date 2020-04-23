import React, { useState } from 'react';
import { Grid, Typography, Box, Divider, Chip } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import Avatar from '@material-ui/core/Avatar';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Coords } from '../types/Coords';

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
    },
    space: {
      minHeight: 600,
    },
    spaceBetween: {
      display: 'flex',
      justifyContent: 'space-between',
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
  };
  equipment?: string[];
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
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState<number | null>(2);

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
                    <Box fontWeight={400}>
                      {owner?.first_name} [Profile pic here]
                      <Box fontWeight={200}>{owner?.email}</Box>
                    </Box>
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
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
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
              <Divider />

              <Grid item>
                <Box className={classes.description}>{description}</Box>
                <Divider />
                <Box className={classes.space}>[REVIEWS HERE]</Box>
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
