import React from 'react';
import { FieldHookConfig, useField } from 'formik';
import { FormControlLabel, Radio } from '@material-ui/core';

type RadioFieldProps = { label: string } & FieldHookConfig<{}>;

export const RadioField: React.FC<RadioFieldProps> = ({ label, ...props }) => {
  const [field] = useField(props);

  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};
