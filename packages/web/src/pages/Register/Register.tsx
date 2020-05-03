import React, { useState, useEffect } from 'react';
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
import { LoaderBlock } from '../../components/LoaderBlock';

//have preferences on seperate page
//we get route props because this component is passed
// as a prop to the react-router-dom <Route/> component

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
    .required('Required')
    .matches(/^\S*$/, 'Username must contain no spaces'),
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
  const [register, { error, loading }] = useRegisterMutation();

  const submitUser = async (values: RegisterInput) => {
    //convert exercise types to true false object
    await register({
      variables: values,
      refetchQueries: [{ query: UsersDocument }],
    });
  };

  return (
    <Formik
      initialValues={{
        first_name: '',
        last_name: '',
        username: '',
        birthday: '',
        preferences: [],
        email: '',
        password: '',
        confirmPassword: '',
        photo_url: '',
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const submitValues = {
          ...values,
          preferences: prefArrToBoolObj(values.preferences),
        };
        await submitUser(submitValues);
        history.push('/login');
      }}
      validationSchema={RegisterSchema}
    >
      {({ values, isSubmitting, errors }) => (
        <div>
          {loading ? (
            <LoaderBlock />
          ) : (
            <FormContainer
              title="Register"
              pageProgress
              pageNum={currentPage}
              pageCount={pages.length}
            >
              <span style={{ color: 'red' }}>{error && error.message}</span>

              {pages[currentPage]}
              <FormPageControl
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                length={pages.length}
                isSubmitting={isSubmitting}
                errors={errors}
              />
            </FormContainer>
          )}
        </div>
      )}
    </Formik>
  );
};
