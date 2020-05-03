import React from 'react';
import { FormField } from '../../components/FormComponents/FormField';
import { FormikMapsAuto } from '../../components/FormComponents/FormikMapsAuto';

interface Page1Props {}

export const Page1: React.FC<Page1Props> = () => {
  return (
    <>
      <FormField placeholder="Gym Name" name="gym_name" type="input" />
      <FormField placeholder="Description" name="description" type="multi" />

      <FormField
        placeholder="Membership Cost (Monthly)"
        name="membership_cost"
        type="money"
        min="1"
        step="any"
      />
      {/* <FormField placeholder="Phone #" name="phone" type="input" /> */}
      <FormikMapsAuto />
    </>
  );
};
