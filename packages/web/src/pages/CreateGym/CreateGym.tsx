import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Formik } from 'formik';
import { FormContainer } from '../../components/FormComponents/FormContainer';
import { FormPageControl } from '../../components/FormPageControl';
import { Page1 } from './Page1';
import { Page2 } from './Page2';
import { getAccessToken } from '../../accessToken';
import { useRouter } from '../../hooks';
import { useMyGymQuery } from '@gw/controllers';
//we get route props because this component is passed
// as a prop to the react-router-dom <Route/> component
const mock = {
  email: 'devito@gmail.com',
  password: 'Test123@',
};

const pages: JSX.Element[] = [<Page1 />, <Page2 />];

export const CreateGym: React.FC<RouteComponentProps> = ({ history }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const myGym = useMyGymQuery();

  if (!getAccessToken()) {
    router.history.push('/register');
  }

  if (myGym.data) {
    router.history.push('/');
  }

  return (
    <Formik
      initialValues={{
        gym_name: '',
        description: '',
        membership_cost: '',
        phone: '',
        equipment: [],
        type: '',
        city: '',
        state: '',
        zip_code: '',
      }}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, isSubmitting, errors }) => (
        <FormContainer title="Create Gym">
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
