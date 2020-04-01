import React from 'react';
import { FieldProps } from 'formik';
import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';

export const FormFieldPassword: React.FC<FieldProps & TextFieldProps> = ({
  placeholder,
  field
}) => {
  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      type="password"
      placeholder={placeholder}
      {...field}
    />
  );
};
