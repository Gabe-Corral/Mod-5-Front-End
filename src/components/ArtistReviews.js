import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';

const ArtistReviews = (props) => {
  const history = useHistory();

  const handleClick = (review) => {
    history.push(`/${props.review.id}`)
    props.getFullReview(review)
  }

  return (
    <div>
    <div className="artist-review-container"
    onClick={() => handleClick(props.review)}
    >
    <div className="img-con">
      <img alt="cover-art" src={props.review.img} />
    </div>
    <div className="content">
      <p>Rating: {props.review.rating}/10</p>
      <p>{props.review.title}</p>
      <p>{props.review.artist}</p>
      </div>
    </div>
    </div>
  )
}

export default ArtistReviews;
