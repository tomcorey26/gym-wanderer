import React from 'react';
import { Field } from 'formik';
import { FormField } from '../../components/FormComponents/FormField';
import { BirthdayField } from '../../components/FormComponents/BirthdayField';

interface Page1Props {}

export const Page1: React.FC<Page1Props> = () => {
  return (
    <>
      <FormField placeholder="First Name" name="firstName" type="input" />
      <FormField placeholder="Last Name" name="lastName" type="input" />

      <BirthdayField name="birthday" type="date" label="Birthday" />

      <FormField placeholder="Email" name="email" type="input" />
      <FormField placeholder="Password" name="password" type="password" />
      <FormField
        placeholder="Confirm Password"
        name="confirmPassword"
        type="password"
      />
    </>
  );
};
