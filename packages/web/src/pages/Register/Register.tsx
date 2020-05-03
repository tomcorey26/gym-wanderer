import React, { useState } from 'react';
import {
  useRegisterMutation,
  UsersDocument,
  useUpdateUserMutation,
  useMyProfileQuery,
  UserProfileDocument,
} from '@gw/controllers';
import { RouteComponentProps, useLocation } from 'react-router-dom';
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
import { mapPrefObjToArray, deleteEmptyValues } from '../../utils';

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

const UpdateSchema = Yup.object().shape({
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
});

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isUserLoggedIn = useRequireNoUser();
  const location = useLocation();
  const [register, { error, loading }] = useRegisterMutation();
  const [
    updateUser,
    { error: updateError, loading: updateLoading },
  ] = useUpdateUserMutation();
  const { data, loading: profileLoading } = useMyProfileQuery();
  const onRegisterPage = location.pathname === '/register';

  const submitUser = async (values: RegisterInput) => {
    //convert exercise types to true false object

    if (onRegisterPage) {
      await register({
        variables: values,
        refetchQueries: [{ query: UsersDocument }],
      });
      history.push('/login');
    } else {
      await updateUser({
        variables: deleteEmptyValues(values),
        refetchQueries: [
          { query: UsersDocument },
          {
            query: UserProfileDocument,
            variables: { userId: data?.myProfile?.id },
          },
        ],
      });
      history.push('/user/' + data?.myProfile?.id);
    }
  };

  const RegisterIntitialValues = {
    first_name: '',
    last_name: '',
    username: '',
    birthday: '',
    preferences: [],
    email: '',
    password: '',
    confirmPassword: '',
    photo_url: '',
  };

  const UpdateIntitialValues = {
    first_name: data?.myProfile?.first_name || '',
    last_name: data?.myProfile?.last_name || '',
    username: data?.myProfile?.username || '',
    birthday: data?.myProfile?.birthday || '',
    preferences: mapPrefObjToArray(data?.myProfile?.preferences) || [],
    email: data?.myProfile?.email || '',
    password: '',
    confirmPassword: '',
    photo_url: data?.myProfile?.photo_url || '',
  };

  if (profileLoading) {
    return <LoaderBlock width="100vw" height="100vh" />;
  }
  return (
    <Formik
      initialValues={
        onRegisterPage ? RegisterIntitialValues : UpdateIntitialValues
      }
      onSubmit={async (values, { setSubmitting }) => {
        const submitValues = {
          ...values,
          preferences: prefArrToBoolObj(values.preferences),
        };
        await submitUser(submitValues);
      }}
      validationSchema={onRegisterPage ? RegisterSchema : UpdateSchema}
    >
      {({ values, isSubmitting, errors }) => (
        <div>
          {loading || updateLoading ? (
            <LoaderBlock />
          ) : (
            <FormContainer
              title={onRegisterPage ? 'Register' : 'Update Profile'}
              pageProgress={onRegisterPage}
              pageNum={currentPage}
              pageCount={pages.length}
            >
              {onRegisterPage ? (
                <span style={{ color: 'red' }}>{error && error.message}</span>
              ) : (
                <span style={{ color: 'red' }}>
                  {updateError && updateError.message}
                </span>
              )}

              {pages[currentPage]}
              <FormPageControl
                buttonTitle={onRegisterPage ? 'Register' : 'Update Profile'}
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
