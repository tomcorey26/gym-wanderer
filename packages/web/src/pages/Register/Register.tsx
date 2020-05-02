import React, { useState } from 'react';
import { useRegisterMutation, UsersDocument } from '@gw/controllers';
import { RouteComponentProps } from 'react-router-dom';
import { Formik } from 'formik';
import { Page1 } from './Page1';
import { Page2 } from './Page2';
import { Page3 } from './Page3';
import * as Yup from 'yup';
import { prefArrToBoolObj } from '../../utils/prefArrToBoolObj';
import { FormContainer } from '../../components/FormComponents/FormContainer';
import { useRequireNoUser } from '../../hooks/useRequireNoUser';
import { FormPageControl } from '../../components/FormPageControl';

//have preferences on seperate page
//we get route props because this component is passed
// as a prop to the react-router-dom <Route/> component

const mockUser = {
  first_name: 'member1',
  last_name: 'Devito',
  username: 'dvito',
  birthday: '1944-11-14',
  preferences: [],
  email: 'member1@gmail.com',
  password: 'Test123@',
  confirmPassword: 'Test123@',
  photo_url: '',
};

interface Preferences {
  bodybuilding: boolean;
  crossfit: boolean;
  yoga: boolean;
  parkour: boolean;
  general: boolean;
  boxing: boolean;
}
export interface RegisterInput {
  first_name: string;
  last_name: string;
  username: string;
  birthday: string;
  preferences: Preferences;
  email: string;
  password: string;
  confirmPassword: string;
  photo_url: string;
}
const pages: JSX.Element[] = [<Page1 />, <Page2 />, <Page3 />];

const RegisterSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  last_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  username: Yup.string()
    .min(5, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isUserLoggedIn = useRequireNoUser();
  const [register] = useRegisterMutation();

  const submitUser = async (values: RegisterInput) => {
    //convert exercise types to true false object
    console.log(values);
    const response = await register({
      variables: values,
      refetchQueries: [{ query: UsersDocument }],
    });
    console.log(response);
  };

  return (
    <Formik
      initialValues={mockUser}
      onSubmit={async (values, { setSubmitting }) => {
        const submitValues = {
          ...values,
          preferences: prefArrToBoolObj(values.preferences),
        };
        setSubmitting(true);
        await submitUser(submitValues);
        setSubmitting(false);
        history.push('/');
      }}
      validationSchema={RegisterSchema}
    >
      {({ values, isSubmitting, errors }) => (
        <FormContainer
          title="Register"
          pageProgress
          pageNum={currentPage}
          pageCount={pages.length}
        >
          {pages[currentPage]}
          <FormPageControl
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            length={pages.length}
            isSubmitting={isSubmitting}
            errors={errors}
          />
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </FormContainer>
      )}
    </Formik>
  );
};
