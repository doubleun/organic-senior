import Image from "next/image";
import ReviewStars from "../Global/reviewStars";

const Comment = ({ review, user }) => {
  return (
    <div className="commentContainer">
      {/* Profile image */}
      <div className="commentProfileImageDiv">
        <Image
          src={user.image}
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
        />
      </div>

      {/* Comment content */}
      <div className="reviewContentContainer">
        <h6>{user.name}</h6>
        <ReviewStars ratings={review.rating} />
        <p>{review.comment}</p>
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
