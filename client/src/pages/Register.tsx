import React, { useState } from 'react';
import { useRegisterMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { Button, Checkbox, Container } from '@material-ui/core';
import { PageProgress } from '../components/PageProgress';
import { FormField } from '../components/FormComponents/FormField';
//have preferences on seperate page
//we get route props because this component is passed
// as a prop to the react-router-dom <Route/> component
export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const pageCount = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const [register] = useRegisterMutation();

  const submitUser = async ({ email, password, firstName, lastName, age }) => {
    const response = await register({
      variables: {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        age: parseInt(age)
      }
    });
    console.log(response);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        age: '',
        exerciseTypes: [],
        email: '',
        password: ''
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await submitUser(values);
        setSubmitting(false);
        history.push('/');
      }}
    >
      {({ values, isSubmitting }) => (
        <Container maxWidth="sm">
          <Form>
            <div className="register-form-container">
              <PageProgress pageNum={currentPage} pageCount={pageCount} />
              <div className="register-form">
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
                <Field
                  placeholder="Age"
                  name="age"
                  type="input"
                  component={FormField}
                />

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
                {/* 
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
                  </div> */}
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  login
                </Button>
              </div>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        </Container>
      )}
    </Formik>
  );
};
