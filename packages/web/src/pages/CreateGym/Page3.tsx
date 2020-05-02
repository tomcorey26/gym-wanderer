import React, { useState } from 'react';
import { CloudinaryUpload } from '../../components/CloudinaryUpload';
import { CloudinaryImg } from '../../types';
import { useField, useFormikContext } from 'formik';
import { CreateGymFormValues } from './CreateGym';
import { Button, CircularProgress } from '@material-ui/core';

interface Page3Props {}

export const Page3: React.FC<Page3Props> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, __, { setValue }] = useField({ name: 'photo_urls' });
  const { values } = useFormikContext<CreateGymFormValues>();
  const [loading, setLoading] = useState<boolean>(false);

  const onUpload = (imgArr: CloudinaryImg[]) => {
    setValue(imgArr);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      {values.photo_urls.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {values.photo_urls.map((photoUrl) => (
            <img
              src={photoUrl}
              alt={values.gym_name}
              style={{ width: 150, height: 150, margin: 8 }}
            />
          ))}
          <Button onClick={() => setValue('')}>Change Pictures</Button>
        </div>
      )}
      {values.gym_name && !values.photo_urls.length ? (
        <CloudinaryUpload
          onUpload={onUpload}
          folderName={values.gym_name}
          setLoading={setLoading}
        />
      ) : (
        <>
          {values.photo_urls.length > 0 && (
            <h2>You have to provide a gym name in order to upload photos</h2>
          )}
        </>
      )}
    </div>
  );
};
