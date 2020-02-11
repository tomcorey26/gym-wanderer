import React from "react";
import SideScrollerBox from "./SideScrollerBox";

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
  hoveredGymId: number;
  onMouseOver: any;
  onMouseLeave: any;
}

const MapsSideScroller: React.FC<Props> = ({
  gyms,
  hoveredGymId,
  onMouseLeave,
  onMouseOver
}) => {
  const classes = useStyles();
  return (
    <div style={{ width: "50%" }} className="scroller-box">
      <List className={classes.root}>
        {gyms.map((gym, i) => (
          <SideScrollerBox
            onMouseOver={() => onMouseOver(gym.id)}
            onMouseLeave={onMouseLeave}
            key={i}
            isHovered={hoveredGymId === gym.id}
            {...gym}
          />
        ))}
      </List>
    </div>
  );
};

export default MapsSideScroller;
