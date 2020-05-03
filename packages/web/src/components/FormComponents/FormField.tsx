import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import { TextField, OutlinedInput, InputAdornment } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';

type FormFieldProps = {
  placeholder: string;
  type: string;
} & FieldHookConfig<{}> &
  TextFieldProps;
export const FormField: React.FC<FormFieldProps> = ({
  placeholder,
  type,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  if (type === 'multi') {
    return (
      <TextField
        id="outlined-multiline-flexible"
        label={placeholder}
        multiline
        placeholder={placeholder}
        rows={3}
        rowsMax={4}
        variant="outlined"
        fullWidth
        helperText={errorText}
        error={!!errorText}
        {...field}
      />
    );
  }
  if (type === 'money') {
    return (
      <>
        <OutlinedInput
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          fullWidth
          style={{ margin: 8 }}
          placeholder={placeholder}
          {...field}
          type="number"
          required
          error={!!errorText}
        />
        <div style={{ width: '100%', textAlign: 'left' }}>
          {!!errorText && (
            <span style={{ color: 'red', fontSize: 12 }}>{errorText}</span>
          )}
        </div>
      </>
    );
  }

  return (
    <TextField
      size="small"
      fullWidth
      style={{ margin: 8 }}
      variant="outlined"
      placeholder={placeholder}
      {...field}
      type={type}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
