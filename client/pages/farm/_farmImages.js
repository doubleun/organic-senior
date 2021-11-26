import { BsFillPencilFill } from "react-icons/bs";
import Image from "next/image";
import farm1 from "../../public/images/farm1.jpg";
import farm2 from "../../public/images/farm2.jpg";
import farm3 from "../../public/images/farm3.jpg";

import { useState } from "react";
import FarmImageUpload from "./modals/_imageUpload";

export default function FarmImages({
  userInfo,
  farmInfo,
  editFarmImages,
  setAlertSuccess,
}) {
  const [showImageUpload, setShowImageUpload] = useState(false);

  return (
    <div className="farmImages">
      {farmInfo.farmImages.length !== 0 ? (
        farmInfo.farmImages.map((img, index) => (
          <Image src={img} width="526" height="380" key={index} />
        ))
      ) : (
        <>
          <Image src={farm1} width="526" height="380" />
          <Image src={farm2} width="526" height="380" />
          <Image src={farm3} width="526" height="380" />
        </>
      )}

      {/* Edit farm button on the bottom right */}
      {editFarmImages ? (
        <div
          className="editFarmImagesButton"
          onClick={() => setShowImageUpload(true)}
        >
          <BsFillPencilFill style={{ marginInline: "4px" }} />
          Edit farm images
        </div>
      ) : null}

      {/* Image upload modal */}
      {showImageUpload ? (
        <FarmImageUpload
          userInfo={userInfo}
          farmInfo={farmInfo}
          setShowImageUpload={setShowImageUpload}
          setAlertSuccess={setAlertSuccess}
        />
      ) : null}
    </div>
  );
}
