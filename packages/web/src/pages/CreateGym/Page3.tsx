import React from 'react';
import { CloudinaryUpload } from '../../components/CloudinaryUpload';
import { CloudinaryImg } from '../../types';
import { useField, useFormikContext } from 'formik';
import { CreateGymFormValues } from './CreateGym';

interface Page3Props {}

export const Page3: React.FC<Page3Props> = ({}) => {
  const [_, __, { setValue }] = useField({ name: 'photo_urls' });
  const { values } = useFormikContext<CreateGymFormValues>();

  const onUpload = (imgArr: CloudinaryImg[]) => {
    setValue(imgArr);
    console.log(imgArr);
  };

  return (
    <div>
      {values.gym_name ? (
        <CloudinaryUpload onUpload={onUpload} folderName={values.gym_name} />
      ) : (
        <h2>You have to provide a gym name in order to upload photos</h2>
      )}
    </div>
  );
};
