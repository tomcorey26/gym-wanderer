import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width: '70%',
        padding: 5,
    },
    form: {
        padding: 15
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
      },
  }),
);

interface GymReservationFormProps {

}

const GymReservationForm: React.FC<GymReservationFormProps> = ({}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState<number | null>(2);

    return (
      <div style={{width:'100%',display:'flex', justifyContent:'center'}}>
        <div className={classes.root}>
        <Card>
        <CardHeader
          
          action={
            <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            /> 
          }
          title="$2/hr"
          subheader="Owner Name"
        />
       
        <CardContent>
            
          <Typography paragraph variant="body2" color="textSecondary" component="p">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil quisquam quibusdam ipsa! Itaque, voluptatem, consectetur quia debitis consequuntur assumenda perferendis laboriosam architecto, recusandae corporis nostrum animi voluptatum reprehenderit obcaecati provident qui! Sed aut voluptatibus dolorem sit amet nulla expedita at deleniti, odio impedit quas iusto modi magnam non dolores officiis minima harum voluptatem! At, delectus nam? Neque dolorem soluta velit distinctio, animi, maiores impedit cum similique quo praesentium sint eaque, eligendi mollitia. Exercitationem animi ad eveniet harum perferendis, accusamus natus est repudiandae, esse asperiores expedita quisquam culpa aliquam, dolorum magni perspiciatis. Voluptates minus porro ipsam repellat, impedit debitis incidunt aliquid.
          </Typography>
          <Typography paragraph variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
         
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
      </div>
    </div>
    );
}
export default GymReservationForm