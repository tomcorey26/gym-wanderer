import React from "react";
import { useInputValue } from "../hooks/useInputValue";
import SearchIcon from "@material-ui/icons/Search";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
      width: "80%"
    }
  })
);

interface Props {
  value: string;
  onChange: (e: any) => void;
}

const SearchFilter: React.FC<Props> = ({ value, onChange }) => {
  const classes = useStyles();

  return (
    <div className="center">
      <TextField
        value={value}
        onChange={onChange}
        className={classes.margin}
        id="input-with-icon-textfield"
        label="Filter"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </div>
  );
};

export default SearchFilter;
