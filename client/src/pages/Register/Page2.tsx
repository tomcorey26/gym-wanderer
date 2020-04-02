import React from 'react';
import { Field } from 'formik';
import { Checkbox } from '@material-ui/core';

interface Page2Props {}

export const Page2: React.FC<Page2Props> = ({}) => {
  return (
    <>
      <div>
        body building
        <Field
          name="exerciseTypes"
          type="checkbox"
          value="Bodybuilding"
          as={Checkbox}
        />
      </div>
      <div>
        CrossFit
        <Field
          name="exerciseTypes"
          type="checkbox"
          value="CrossFit"
          as={Checkbox}
        />
      </div>
      <div>
        Yoga
        <Field
          name="exerciseTypes"
          type="checkbox"
          value="Yoga"
          as={Checkbox}
        />
      </div>
    </>
  );
};
