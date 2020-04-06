import React from "react";
import SideScrollerBox from "./SideScrollerBox";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "../hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

interface Props {
  gyms: any;
}

const MapsSideScroller: React.FC<Props> = ({ gyms }) => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <>
      <List className={classes.root}>
        {gyms.map((gym, i) => (
          <SideScrollerBox
            onClick={() => router.push(`/gyms/${gym.id}`)}
            id={gym.id}
            key={i}
            {...gym}
          />
        ))}
      </List>
    </>
  );
};

export default MapsSideScroller;
