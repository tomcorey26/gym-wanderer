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
    height: "85%"
  },
  item: {
    height: "300px"
  }
}));

const SideScrollerBox: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <ListItem button className={classes.item} alignItems="center">
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
              Toms Dawg Pound
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
                Tom Corey
              </Typography>
              {" - Providence RI"}
            </React.Fragment>
          }
        />
        <ListItemText
          primary="Rating • 5 Stars"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                $5 / hour
              </Typography>
              {" Weights gym"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default SideScrollerBox;
