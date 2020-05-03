import React, { useEffect } from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';
import { PlaceType } from '../../types/Placetype';

type AutoCompleteFieldProps = {
  placeholder: string;
  name: string;
  autoVal: string;
} & any;

export const AutoCompleteField: React.FC<AutoCompleteFieldProps> = ({
  placeholder,
  name,
  onChange: googleOnChange,
  autoVal,
  ...props
}) => {
  const [
    { onChange: formikOnChange, ...formikProps },
    meta,
    { setValue },
  ] = useField({
    placeholder,
    name,
  });
  const errorText = meta.error && meta.touched ? meta.error : '';

  useEffect(() => {
    if (autoVal) {
      setValue(autoVal);
    }
  }, [autoVal]);

  return (
    <TextField
      {...props}
      size="small"
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      onChange={(event, value: PlaceType | null) => {
        googleOnChange(event, value);
        formikOnChange(event);
      }}
      // {...field}
      {...formikProps}
      type="input"
      helperText={errorText}
      error={!!errorText}
    />
  );
};
