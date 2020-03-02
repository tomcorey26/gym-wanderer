import React, { useState,useCallback } from "react";
import GymPicGallery from '../components/GymPicGallery'
import {photos} from '../assets/photos'

interface GymDetailProps {}

const GymDetail: React.FC = () => {
  // const router = useRouter();
  // const id = router.match.params.id;

  // useEffect(() => {
  //   let h1: any = document.getElementById("param");
  //   h1.textContent = id;
  // }, [id]);
  

  return (
    <div >
      <GymPicGallery photos={photos}/>
      
    </div>

  );
  };

  export default GymDetail;
