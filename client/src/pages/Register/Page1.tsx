import React from 'react';
import { Field } from 'formik';
import { FormField } from '../../components/FormComponents/FormField';

interface Page1Props {}

export const Page1: React.FC<Page1Props> = () => {
  return (
    <>
      <Field
        placeholder="First Name"
        name="firstName"
        type="input"
        component={FormField}
      />
      <Field
        placeholder="Last Name"
        name="lastName"
        type="input"
        component={FormField}
      />
      <Field placeholder="Age" name="age" type="input" component={FormField} />

      <Field
        placeholder="Email"
        name="email"
        type="input"
        component={FormField}
      />
      <Field
        placeholder="Password"
        name="password"
        type="password"
        component={FormField}
      />
    </>
  );
};
