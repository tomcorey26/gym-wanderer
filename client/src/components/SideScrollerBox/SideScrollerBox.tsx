import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import GymPic from "../../assets/gymPic.jpg";

const useStyles = makeStyles(theme => ({
  inline: {
    display: "inline"
  },
  title: {
    fontSize: "2rem"
  },
  avatarItem: {
    height: "90%",
    width: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    width: "64%",
    height: "72%"
  },
  item: {
    height: "300px"
  },
  hover: {
    height: "300px",
    background: "grey"
  }
}));

interface Props {
  type: string;
  rating: number;
  name: string;
  ownername: string;
  location: {
    city: string;
    state: string;
  };
  cost: number;
  equipment: Array<string>;
  isHovered: number;
  onMouseOver: any;
  onMouseLeave: any;
}

const SideScrollerBox: React.FC<Props> = ({
  cost,
  equipment,
  location,
  name,
  ownername,
  rating,
  type,
  isHovered,
  onMouseLeave,
  onMouseOver
}) => {
  const classes = useStyles();

  return (
    <>
      <ListItem
        button
        className={isHovered ? classes.hover : classes.item}
        alignItems="center"
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
      >
        <ListItemAvatar className={classes.avatarItem}>
          <Avatar className={classes.avatar} alt="Remy Sharp" src={GymPic} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              component="span"
              variant="body2"
              className={classes.title}
              color="textPrimary"
            >
              {name}
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
                {ownername}
              </Typography>
              {` - ${location.city}, ${location.state}`}
            </React.Fragment>
          }
        />
        <ListItemText
          primary={`Rating • ${rating} Stars`}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {"$"}
                {cost} / hour
              </Typography>{" "}
              {type}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default SideScrollerBox;
