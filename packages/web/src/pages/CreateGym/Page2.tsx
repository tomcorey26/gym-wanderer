import React from 'react';
import { RadioField } from '../../components/FormComponents/RadioField';
import {
  FormGroup,
  FormControl,
  makeStyles,
  Theme,
  createStyles,
  FormLabel,
} from '@material-ui/core';

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

interface Page2Props {}

export const Page2: React.FC<Page2Props> = ({}) => {
  const classes = useStyles();
  return (
    <>
      <FormLabel component="legend">Choose Gym type</FormLabel>
      <FormControl component="div" className={classes.formControl}>
        <div>
          <FormGroup>
            <RadioField
              label="Bodybuilding"
              name="type"
              value="bodybuilding"
              type="radio"
            />
            <RadioField
              label="CrossFit"
              name="type"
              value="crossfit"
              type="radio"
            />
            <RadioField label="Yoga" name="type" value="yoga" type="radio" />
          </FormGroup>
        </div>
        <div>
          <FormGroup>
            <RadioField
              label="Parkour"
              name="type"
              type="radio"
              value="parkour"
            />
            <RadioField
              label="General"
              name="type"
              value="general"
              type="radio"
            />
            <RadioField
              label="Boxing"
              name="type"
              value="boxing"
              type="radio"
            />
          </FormGroup>
        </div>
      </FormControl>
      <div>
        <h1>Equipment form here</h1>
      </div>
    </>
  );
};
