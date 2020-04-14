import React from 'react';
import { Field } from 'formik';
import {
  Checkbox,
  FormGroup,
  FormLabel,
  FormControl,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { CheckboxField } from '../../components/FormComponents/CheckboxField';

interface Page2Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
      display: 'flex',
      flexDirection: 'row',
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
              name="preferences"
              type="checkbox"
              value="bodybuilding"
              as={Checkbox}
            />
            <CheckboxField
              label="CrossFit"
              name="preferences"
              type="checkbox"
              value="crossfit"
              as={Checkbox}
            />
            <CheckboxField
              label="Yoga"
              name="preferences"
              type="checkbox"
              value="yoga"
              as={Checkbox}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup>
            <CheckboxField
              label="Parkour"
              name="preferences"
              type="checkbox"
              value="parkour"
              as={Checkbox}
            />
            <CheckboxField
              label="General"
              name="preferences"
              type="checkbox"
              value="general"
              as={Checkbox}
            />
            <CheckboxField
              label="Boxing"
              name="preferences"
              type="checkbox"
              value="boxing"
              as={Checkbox}
            />
          </FormGroup>
        </div>
      </FormControl>
    </>
  );
};
