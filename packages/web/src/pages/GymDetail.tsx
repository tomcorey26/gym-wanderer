import React from 'react';
import GymPicGallery from '../components/GymPicGallery';
import GymReservationForm from '../components/GymReservationForm';
import GymDescription from '../components/GymDescription';
import { useParams } from 'react-router-dom';
import { useGymDetailsQuery } from '@gw/controllers';
import { CircularProgress, useMediaQuery } from '@material-ui/core';

const GymDetail: React.FC = () => {
  const { id } = useParams();
  const { data, loading, error } = useGymDetailsQuery({
    variables: {
      id: id,
    },
  });

  const matches = useMediaQuery('(min-width:1000px)');

  if (error) {
    console.log('error', error);
  }

  if (loading)
    return (
      <div
        style={{
          width: '90vw',
          height: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
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
              owner_id: data.gymDetails.owner_id,
              first_name: data.gymDetails.owner_first_name,
              last_name: data.gymDetails.owner_last_name,
              owner_photo_url: data.gymDetails.owner_photo_url,
              email: data.gymDetails.email,
            }}
            gym_name={data?.gymDetails?.gym?.gym_name}
            description={data?.gymDetails?.gym?.description}
            membership_cost={data?.gymDetails?.gym?.membership_cost}
            location={data?.gymDetails?.gym?.location}
            coordinates={data?.gymDetails?.gym?.coordinates}
            type={data?.gymDetails?.gym?.type}
            equipment={data.gymDetails.gym?.equipment}
            reviews={data.gymReviews || []}
            loading={loading}
            currentUserId={data.me?.id || ''}
            gymId={id ? id : ''}
          />
          <GymReservationForm
            gymId={id}
            membership_cost={data?.gymDetails?.gym?.membership_cost}
          />
        </div>
      </div>
    </div>
  );
};

export default GymDetail;
