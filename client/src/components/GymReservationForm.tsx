import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box, Divider, Chip } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 800,
    },
    topSpace: {
      marginTop: 10
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: theme.spacing(0.5),
    },
    chip: {
      margin: theme.spacing(0.5)
    },
    description: {
      padding: 10
    }
  }),
);
interface GymReservationFormProps {

}

const GymReservationForm: React.FC<GymReservationFormProps> = ({}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState<number | null>(2);
    const [chipData, setChipData] = React.useState<any>([
      { key: 0, label: 'Olympic Barbell' },
      { key: 1, label: 'Free Weights' },
      { key: 2, label: 'Wide Space' },
      { key: 3, label: 'New Equipment' },
      { key: 4, label: 'Private' },
    ]);

    return (
      <div style={{width:'100%',display:'flex', justifyContent:'center'}}>
        <div className={classes.root}>
          <Box className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="h3" >
                      <Box fontWeight={500}>
                        Gym Name 
                      </Box>
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      <Box fontWeight={500}>
                        $7/hr <span style={{fontWeight: 20}}>per person</span> 
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
                      {chipData.map(data => {
                        let icon = <FitnessCenterIcon />;

                        // if (data.label === 'React') {
                        //   icon = <TagFacesIcon />;
                        // }

                        return (
                          <Chip
                            key={data.key}
                            icon={icon}
                            label={data.label}
                            className={classes.chip}
                          />
                        );
                      })}
                    </Box>
                  </Grid>
                  <Divider />

                  <Grid item>
                    <Box className={classes.description}>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta neque laudantium ex incidunt suscipit libero commodi corporis necessitatibus, esse reiciendis id omnis expedita, qui quae vel ipsum. Adipisci, natus? Quisquam doloribus rem soluta. Unde veniam perferendis ipsum excepturi corrupti impedit facere laudantium a ratione amet sunt tempora dolorum ullam rem architecto aliquam praesentium, neque tenetur ab magnam! Temporibus earum doloribus facilis voluptatem deserunt praesentium odio dolorem, facere impedit incidunt in excepturi quidem beatae quasi laudantium blanditiis, ullam repellendus ducimus quas ea quos eum quis. Nam earum omnis beatae quas possimus! Cum vitae at dolore aut, soluta quidem libero nesciunt voluptate dolorem? Eum unde blanditiis officia sed libero? Iure ratione qui quidem voluptatibus pariatur eos neque, corrupti, impedit nemo quis ullam illum sit nesciunt autem. Enim nam vitae labore optio, aperiam rem ad magnam in? Corrupti, corporis! Similique laudantium illo minima impedit quae veritatis ducimus quibusdam ea iure molestias voluptate iste, in esse dignissimos tenetur sit cum porro cumque odit qui delectus? Accusamus voluptatem ipsum, ratione nihil quia, inventore quisquam magnam reiciendis aperiam rem eveniet ea laborum nisi doloribus enim dolor delectus ipsa ullam sed. Tempore fugit, quia illo qui voluptatum ratione eius nulla veniam suscipit quos, modi repellat facere ullam!
                    </Box>
                  </Grid>
                </Grid>
                <Grid item>
                  <Avatar>M</Avatar>
                </Grid>
              </Grid>
            </Grid>
          {/* <CardHeader
            action={
              
            }
            title="$2/hr"
            subheader="Owner Name"
          />
        */}

        </Box>
      </div>
    </div>
    );
}
export default GymReservationForm