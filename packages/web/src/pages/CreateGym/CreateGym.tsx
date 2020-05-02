import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Formik } from 'formik';
import { FormContainer } from '../../components/FormComponents/FormContainer';
import { FormPageControl } from '../../components/FormPageControl';
import { Page1 } from './Page1';
import { Page2 } from './Page2';
import { Page3 } from './Page3';
import { getAccessToken } from '../../accessToken';
import { useRouter } from '../../hooks';
import {
  useCreateGymMutation,
  useMeQuery,
  GymTypes,
  MeDocument,
} from '@gw/controllers';
import { Coords } from '../../types/Coords';
//we get route props because this component is passed
// as a prop to the react-router-dom <Route/> component

const pages: JSX.Element[] = [<Page1 />, <Page2 />, <Page3 />];
export interface CreateGymFormValues {
  gym_name: string;
  description: string;
  membership_cost: string;
  coordinates: Coords;
  // phone: '',
  location: string;
  equipment: string[];
  photo_urls: string[];
  type: string;
}

export const CreateGym: React.FC<RouteComponentProps> = ({ history }) => {
  const initialValues: CreateGymFormValues = {
    gym_name: '',
    description: '',
    membership_cost: '0',
    coordinates: {
      lat: 0,
      lng: 0,
    },
    // phone: '',
    location: '',
    equipment: [],
    photo_urls: [],
    type: '',
  };
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const { data, loading } = useMeQuery();
  const [createGym] = useCreateGymMutation();

  useEffect(() => {
    if (!getAccessToken()) {
      router.history.push('/register');
    }

    if (data?.me?.gym || (!data?.me && !loading)) {
      router.history.push('/');
    }
  }, [data, router.history, loading]);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        let res = await createGym({
          variables: {
            ...values,
            membership_cost: values.membership_cost.toString(),
            type:
              GymTypes[
                values.type.charAt(0).toUpperCase() + values.type.slice(1)
              ],
            ownerId: data!.me!.id,
          },
          refetchQueries: [{ query: MeDocument }],
        });
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting, errors }) => (
        <FormContainer
          title="Create Gym"
          pageCount={pages.length}
          pageNum={currentPage}
          pageProgress
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
