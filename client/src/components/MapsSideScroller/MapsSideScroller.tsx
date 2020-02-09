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

interface Props {
  gyms: any;
}

const MapsSideScroller: React.FC<Props> = ({ gyms }) => {
  const classes = useStyles();
  return (
    <div className="scroller-box">
      <List className={classes.root}>
        {gyms.map(gym => (
          <SideScrollerBox {...gym} />
        ))}
      </List>
    </div>
  );
};

export default MapsSideScroller;