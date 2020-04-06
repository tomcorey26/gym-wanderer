import React from "react";
import { Field } from "formik";
import {
  Checkbox,
  FormGroup,
  FormLabel,
  FormControl,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { CheckboxField } from "../../components/FormComponents/CheckboxField";

interface Page2Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    formControl: {
      margin: theme.spacing(3),
    },
  })
);

export const Page2: React.FC<Page2Props> = ({}) => {
  const classes = useStyles();

  return (
    <>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Choose Exercise Preferences</FormLabel>
        <FormGroup>
          <CheckboxField
            label="Bodybuilding"
            name="exerciseTypes"
            type="checkbox"
            value="Bodybuilding"
            as={Checkbox}
          />
          <CheckboxField
            label="CrossFit"
            name="exerciseTypes"
            type="checkbox"
            value="CrossFit"
            as={Checkbox}
          />
          <CheckboxField
            label="Yoga"
            name="exerciseTypes"
            type="checkbox"
            value="Yoga"
            as={Checkbox}
          />
        </FormGroup>
      </FormControl>
    </>
  );
};
