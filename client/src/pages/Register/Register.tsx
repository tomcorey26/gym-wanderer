import React, { useState } from 'react';
import { useRegisterMutation } from '../../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Button, Container } from '@material-ui/core';
import { PageProgress } from '../../components/PageProgress';
import { Page1 } from './Page1';
import { Page2 } from './Page2';
import { Page3 } from './Page3';
import { usePageControl } from '../../hooks';
import { isObjectEmpty } from '../../utils';
import * as Yup from 'yup';
import { prefArrToBoolObj } from '../../utils/prefArrToBoolObj';
import { FormContainer } from '../../components/FormComponents/FormContainer';

//have preferences on seperate page
//we get route props because this component is passed
// as a prop to the react-router-dom <Route/> component

const mockUser = {
  firstName: 'Danny',
  lastName: 'Devito',
  birthday: '1944-11-14',
  exerciseTypes: [],
  email: 'devito@gmail.com',
  password: 'Test123@',
  confirmPassword: 'Test123@',
};
const pages: JSX.Element[] = [<Page1 />, <Page2 />, <Page3 />];

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
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
  const [register] = useRegisterMutation();
  const { positionCSS, showNext, showPrevious, showSubmit } = usePageControl(
    currentPage,
    pages.length
  );

  const submitUser = async ({
    email,
    password,
    firstName,
    lastName,
    birthday,
    exerciseTypes,
  }) => {
    //convert exercise types to true false object
    const response = await register({
      variables: {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        birthday: birthday,
        preferences: prefArrToBoolObj(exerciseTypes),
      },
    });
    console.log(response);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        birthday: '',
        exerciseTypes: [],
        email: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await submitUser(values);
        setSubmitting(false);
        history.push('/');
      }}
      validationSchema={RegisterSchema}
    >
      {({ values, isSubmitting, errors }) => (
        <FormContainer
          pageProgress
          pageNum={currentPage}
          pageCount={pages.length}
        >
          {pages[currentPage]}
          <div
            style={{
              display: 'flex',
              justifyContent: positionCSS,
              width: '100%',
            }}
          >
            {showPrevious && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setCurrentPage((page) => (page -= 1))}
              >
                Prev Page
              </Button>
            )}

            {showNext && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setCurrentPage((page) => (page += 1))}
              >
                next Page
              </Button>
            )}
          </div>
          {showSubmit && (
            <Button
              disabled={isSubmitting || !isObjectEmpty(errors)}
              type="submit"
              variant="contained"
              color="secondary"
            >
              Register
            </Button>
          )}
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </FormContainer>
      )}
    </Formik>
  );
};
