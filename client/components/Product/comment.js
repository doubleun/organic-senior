import Image from "next/image";
import ReviewStars from "../Global/reviewStars";

const Comment = () => {
  return (
    <div className="commentContainer">
      {/* Profile image */}
      <div className="commentProfileImageDiv">
        <Image
          src="/images/barry.png"
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
        />
      </div>

      {/* Comment content */}
      <div className="reviewContentContainer">
        <ReviewStars ratings={4} />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum nihil
          excepturi, reiciendis fuga eligendi doloremque! Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Nostrum nihil excepturi, reiciendis
          fuga eligendi doloremque!
        </p>
        <div className="reviewTagsContainer">
          <span className="badge rounded-pill bg-success">Excellent Value</span>
          <span className="badge rounded-pill bg-success">
            Excellent Delivery Speed
          </span>
          <span className="badge rounded-pill bg-success">
            Excellent Seller Service Quality
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
