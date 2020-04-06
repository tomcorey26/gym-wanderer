import React from "react";
import { FieldProps, useField, FieldHookConfig } from "formik";
import { TextField } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField/TextField";

type FormFieldProps = {
  placeholder: string;
  type: string;
} & FieldHookConfig<{}>;

export const FormField: React.FC<FormFieldProps> = ({
  placeholder,
  type,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  console.log(meta);
  const errorText = meta.error && meta.touched ? meta.error : "";

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
