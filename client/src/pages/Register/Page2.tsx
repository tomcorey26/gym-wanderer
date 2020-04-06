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
      display: "flex",
      flexDirection: "row",
    },
  })
);

export const Page2: React.FC<Page2Props> = ({}) => {
  const classes = useStyles();

  return (
    <>
      <FormLabel component="legend">Choose Exercise Preferences</FormLabel>
      <FormControl component="div" className={classes.formControl}>
        <div>
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
        </div>
        <div>
          <FormGroup>
            <CheckboxField
              label="Parkour"
              name="exerciseTypes"
              type="checkbox"
              value="Parkour"
              as={Checkbox}
            />
            <CheckboxField
              label="General"
              name="exerciseTypes"
              type="checkbox"
              value="General"
              as={Checkbox}
            />
            <CheckboxField
              label="Boxing"
              name="exerciseTypes"
              type="checkbox"
              value="Boxing"
              as={Checkbox}
            />
          </FormGroup>
        </div>
      </FormControl>
    </>
  );
};
