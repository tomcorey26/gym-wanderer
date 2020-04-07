import React from 'react';
import { FieldHookConfig, useField } from 'formik';
import { TextField } from '@material-ui/core';

type CheckboxProps = { label: string } & FieldHookConfig<{}>;

export const BirthdayField: React.FC<CheckboxProps> = ({ label, ...props }) => {
  const [field] = useField(props);

  return (
    <TextField
      {...field}
      size="small"
      fullWidth
      style={{ margin: 8 }}
      variant="outlined"
      label={label}
      type="date"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};
