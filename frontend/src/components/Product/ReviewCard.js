import React from "react";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };
  const profilePng =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6fVwye3lemzMUkPlZv0ZLx4A9oHz1EJZpLlwyfu4&s";

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="userImage" />
      <p>{review.name} </p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
