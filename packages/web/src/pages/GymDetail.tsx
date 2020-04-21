import React, { useEffect } from 'react';
import GymPicGallery from '../components/GymPicGallery';
import GymReservationForm from '../components/GymReservationForm';
import GymDescription from '../components/GymDescription';
import { photos } from '../assets/photos';
import { useParams } from 'react-router-dom';
import { useGymDetailsQuery } from '@gw/controllers';
import { CircularProgress, useMediaQuery } from '@material-ui/core';

const GymDetail: React.FC = () => {
  const { id } = useParams();
  const { data, loading } = useGymDetailsQuery({
    variables: {
      id: id,
    },
  });
  const matches = useMediaQuery('(min-width:900px)');

  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  if (!data?.gymDetails) {
    return <h1>Gym does not exsist</h1>;
  }

  const photos = data.gymDetails.gym?.photo_urls.map((url) => {
    return { src: url, width: 4, height: 2 };
  });

  return (
    <div>
      {matches && <GymPicGallery photos={photos} />}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '90%',
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <GymDescription
            owner={{
              first_name: data.gymDetails.first_name,
              last_name: data.gymDetails.last_name,
              email: data.gymDetails.email,
            }}
            gym_name={data?.gymDetails?.gym?.gym_name}
            description={data?.gymDetails?.gym?.description}
            membership_cost={data?.gymDetails?.gym?.membership_cost}
            location={data?.gymDetails?.gym?.location}
            coordinates={data?.gymDetails?.gym?.coordinates}
            type={data?.gymDetails?.gym?.type}
            equipment={data.gymDetails.gym?.equipment}
            loading={loading}
          />
          <GymReservationForm />
        </div>
      </div>
    </div>
  );
};

export default GymDetail;
