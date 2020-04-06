import React from "react";
import { Field } from "formik";
import { FormField } from "../../components/FormComponents/FormField";

interface Page1Props {}

export const Page1: React.FC<Page1Props> = () => {
  return (
    <>
      <FormField
        placeholder="First Name"
        name="firstName"
        type="input"
        as={FormField}
      />
      <FormField
        placeholder="Last Name"
        name="lastName"
        type="input"
        as={FormField}
      />
      {/* <Field placeholder="Age" name="age" type="number" component={FormField} /> */}

      <FormField placeholder="Email" name="email" type="input" as={FormField} />
      <FormField
        placeholder="Password"
        name="password"
        type="password"
        as={FormField}
      />
    </>
  );
};
