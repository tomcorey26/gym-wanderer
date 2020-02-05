import React from "react";
import "./MapsSideScroller.scss";
import SideScrollerBox from "../SideScrollerBox/SideScrollerBox";

import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

const MapsSideScroller: React.FC = () => {
  const classes = useStyles();
  return (
    <div className="scroller-box">
      <List className={classes.root}>
        <SideScrollerBox />
        <SideScrollerBox />
        <SideScrollerBox />
        <SideScrollerBox />
        <SideScrollerBox />
        <SideScrollerBox />
        <SideScrollerBox />
        <SideScrollerBox />
        <SideScrollerBox />
        <SideScrollerBox />
        <SideScrollerBox />
        <SideScrollerBox />
        <SideScrollerBox />
        <SideScrollerBox />
        <SideScrollerBox />
      </List>
    </div>
  );
};

export default MapsSideScroller;
