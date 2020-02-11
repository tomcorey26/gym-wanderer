import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import GymPic from "../assets/gymPic.jpg";
import { Coords } from "../types/Coords";

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
  id: number;
  isActive: boolean;
  rating: number;
  ownerName: string;
  gymName: string;
  email: string;
  phone: string;
  location: {
    city: string;
    state: string;
    coordinates: Coords;
  };
  cost: number;
  equipment: Array<string>;
  type: string;
  about: string;
  registered: string;
  isHovered: number;
  onMouseOver: any;
  onMouseLeave: any;
  onClick: any;
}

const SideScrollerBox: React.FC<Props> = ({
  cost,
  equipment,
  location,
  gymName,
  ownerName,
  rating,
  type,
  isHovered,
  onMouseLeave,
  onMouseOver,
  onClick
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
        onClick={onClick}
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
              {gymName}
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
                {ownerName}
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
