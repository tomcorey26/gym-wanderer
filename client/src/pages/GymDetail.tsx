import React, { useEffect } from "react";
import { useRouter } from "../hooks/useRouter";

interface GymDetailProps {}

const GymDetail: React.FC = () => {
  const router = useRouter();
  const id = router.match.params.id;

  useEffect(() => {
    let h1: any = document.getElementById("param");
    h1.textContent = id;
  }, [id]);

  return (
    <div>
      <h1 id="param">{router.match.param}</h1>
    </div>
  );
};

export default GymDetail;
