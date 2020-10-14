import React from 'react';
import { useHistory } from 'react-router-dom';

const Search = (props) => {
  const history = useHistory();

  const handleClick = (review) => {
    history.push(`/${props.review.id}`)
    props.getFullReview(review)
  }

  return (
    <div>
      <div className="search-container"
       onClick={() => handleClick(props.review)}>
      <div className="img-con">
        <img alt="cover-art" src={props.review.img} />
      </div>
      <div className="search-content">
        <p>Rating: {props.review.rating}/10</p>
        <p>{props.review.title} by {props.review.artist}</p>
        </div>
      </div>
    </div>
    )
}

export default Search;
