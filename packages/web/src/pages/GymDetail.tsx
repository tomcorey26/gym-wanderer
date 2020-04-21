import React from 'react';
import GymPicGallery from '../components/GymPicGallery';
import GymReservationForm from '../components/GymReservationForm';
import { photos } from '../assets/photos';
import GymDescription from '../components/GymDescription';

const GymDetail: React.FC = () => {
  // const router = useRouter();
  // const id = router.match.params.id;

  // useEffect(() => {
  //   let h1: any = document.getElementById("param");
  //   h1.textContent = id;
  // }, [id]);

  return (
    <div>
      <GymPicGallery photos={photos} />
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '60%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <GymDescription />
          <GymReservationForm />
        </div>
      </div>
    </div>
  );
};

export default GymDetail;
