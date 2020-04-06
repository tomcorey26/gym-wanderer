import React from "react";
import { FieldHookConfig, useField } from "formik";
import { FormControlLabel, Checkbox } from "@material-ui/core";

type CheckboxProps = { label: string } & FieldHookConfig<{}>;

export const CheckboxField: React.FC<CheckboxProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return <FormControlLabel {...field} control={<Checkbox />} label={label} />;
};
