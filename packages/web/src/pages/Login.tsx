import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useLoginMutation, MeDocument, MeQuery } from '@gw/controllers';
import { setAccessToken } from '../accessToken';
import { Formik } from 'formik';
import { FormContainer } from '../components/FormComponents/FormContainer';
import { Button } from '@material-ui/core';
import { isObjectEmpty } from '../utils';
import { FormField } from '../components/FormComponents/FormField';
import { LoaderBlock } from '../components/LoaderBlock';

//we get route props because this component is passed
// as a prop to the react-router-dom <Route/> component
export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [login, { error }] = useLoginMutation();
  const showSubmit = true;

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={async ({ username, password }, { setSubmitting }) => {
        setSubmitting(true);
        const response = await login({
          variables: {
            username,
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

        if (response && response.data) {
          setAccessToken(response.data.login.accessToken);
        }
        history.push('/');
      }}
    >
      {({ values, isSubmitting, errors }) => (
        <div>
          {isSubmitting ? (
            <LoaderBlock width="100vw" height="100vh" />
          ) : (
            <FormContainer title="Login">
              {error && (
                <span style={{ color: 'red' }}>
                  {error.message.replace('GraphQL error:', '')}
                </span>
              )}
              <FormField placeholder="Username" name="username" type="input" />
              <FormField
                placeholder="Password"
                name="password"
                type="password"
              />

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
            </FormContainer>
          )}
        </div>
      )}
    </Formik>
  );
};
