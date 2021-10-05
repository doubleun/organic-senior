import Image from "next/image";
import farm1 from "../../public/images/farm1.jpg";
import farm2 from "../../public/images/farm2.jpg";
import farm3 from "../../public/images/farm3.jpg";

export default function FarmImages() {
  return (
    <div className="farmImages">
      <Image src={farm1} width="526" height="380" />
      <Image src={farm2} width="526" height="380" />
      <Image src={farm3} width="526" height="380" />
    </div>
  );
}
