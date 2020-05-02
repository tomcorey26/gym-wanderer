import { useField, useFormikContext } from 'formik';
import { CloudinaryImg } from '../../types';
import React from 'react';
import { CloudinaryUploadSingle } from '../../components/CloudinaryUploadSingle';
import { RegisterInput } from './Register';
import { Button } from '@material-ui/core';

interface Page3Props {}

export const Page3: React.FC<Page3Props> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, __, { setValue }] = useField({ name: 'photo_url' });
  const { values } = useFormikContext<RegisterInput>();

  const onUpload = (img: CloudinaryImg) => {
    setValue(img.url);
  };

  return (
    <div>
      {values.photo_url && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={values.photo_url}
            alt={values.username}
            style={{ width: 300, height: 300 }}
          />
          <Button onClick={() => setValue('')}>Change Picture</Button>
        </div>
      )}
      {values.username && !values.photo_url && (
        <CloudinaryUploadSingle
          onUpload={onUpload}
          folderName={values.username}
        />
      )}
      {!values.username && (
        <h2>You have to provide a user name in order to upload photos</h2>
      )}
    </div>
  );
};
