import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useLoginMutation, MeDocument, MeQuery } from '@gw/controllers';
import { setAccessToken } from '../accessToken';
import { Formik } from 'formik';
import { FormContainer } from '../components/FormComponents/FormContainer';
import { Button } from '@material-ui/core';
import { isObjectEmpty } from '../utils';
import { FormField } from '../components/FormComponents/FormField';

//we get route props because this component is passed
// as a prop to the react-router-dom <Route/> component
export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [login] = useLoginMutation();
  const showSubmit = true;

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={async ({ email, password }, { setSubmitting }) => {
        setSubmitting(true);
        const response = await login({
          variables: {
            email,
            password,
          },
          update: (store, { data }) => {
            if (!data) {
              return null;
            }
            store.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                me: data.login.user,
              },
            });
          },
        });

        setSubmitting(false);
        console.log(response);

        if (response && response.data) {
          console.log('setting token', response.data.login.accessToken);
          setAccessToken(response.data.login.accessToken);
        }
        history.push('/');
      }}
    >
      {({ values, isSubmitting, errors }) => (
        <FormContainer>
          <FormField placeholder="Email" name="email" type="input" />
          <FormField placeholder="Password" name="password" type="password" />

          {showSubmit && (
            <Button
              disabled={isSubmitting || !isObjectEmpty(errors)}
              type="submit"
              variant="contained"
              color="secondary"
            >
              Login
            </Button>
          )}
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </FormContainer>
      )}
    </Formik>
  );
};
