import React from 'react';
import { FieldProps } from 'formik';
import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';

export const FormField: React.FC<FieldProps & TextFieldProps> = ({
  placeholder,
  field,
  type
}) => {
  return (
    <TextField
      size="small"
      fullWidth
      style={{ margin: 8 }}
      variant="outlined"
      placeholder={placeholder}
      {...field}
      type={type}
    />
  );
};
