import React, { useState } from 'react';
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
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const matches = useMediaQuery('(min-width:1050px)');
  const xs = useMediaQuery('(max-width:700px)');

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
      {(matches || !xs) && <GymPicGallery photos={photos} />}
      {xs && (
        <div style={{ width: '100vw', height: '30vh', display: 'flex' }}>
          <div
            style={{
              height: '100%',
              width: '10%',
              opacity: 0.5,
              fontSize: 45,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => setPhotoIndex((idx) => idx - 1)}
          >
            {'<'}
          </div>
          {photos && (
            <img
              style={{ width: '80%' }}
              src={photos[photoIndex % photos.length].src}
              alt={data.gymDetails.gym?.gym_name}
            />
          )}
          <div
            style={{
              height: '100%',
              width: '10%',
              opacity: 0.5,
              fontSize: 45,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => setPhotoIndex((idx) => idx + 1)}
          >
            {'>'}
          </div>
        </div>
      )}
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
            mediaQuery={matches}
            gymId={id}
            membership_cost={data?.gymDetails?.gym?.membership_cost}
            iOwnGym={data.me?.id === data.gymDetails.owner_id}
          />
        </div>
      </div>
    </div>
  );
};

export default GymDetail;
