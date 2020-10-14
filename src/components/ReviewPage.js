import React, { useState, useEffect } from 'react';
import Comments from './Comments'
import { useHistory } from 'react-router-dom';

const ReviewPage = (props) => {
  const [comments, setComments] = useState();
  const [commentForm, setCommentForm] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const id = props.currentReview.id;
    fetch(`http://localhost:3000/getcomments/${id}`)
      .then(res => res.json())
      .then(comments => setComments(comments))
  })

  const handleClick = () => {
    const artist = props.currentReview.artist.split(" ").join("").toLowerCase();
    history.push(`/artist/${artist}`);
    props.setCurrentArtist(props.currentReview.artist);
  }

  const handleComment = () => {
    setCommentForm(true);
  }

  return (
    <div>
    <div className="review-page-container">
    <div className="review-page-header">
    <div className="center">
      <img alt="cover-art" src={props.currentReview.img} />
      </div>
      <div className="review-header-contents">
      <h2>{props.currentReview.title}</h2>
      <h3 className="artist-name"
      onClick={handleClick}>{props.currentReview.artist}</h3>
      <h3>{props.currentReview.rating}/10</h3>
      </div>
      <div className="full-review">
      {props.currentReview.review}
      </div>
    </div>
    </div>
    <button onClick={handleComment}>Add a Comment</button>
    {commentForm ? (
      <input type="text" />
    ) : (
      ""
    )}
    {Array.isArray(comments) ? (
      comments.map(c => <Comments comment={c} key={c.id} />)
    ) : (
      ""
    )}
    </div>
  )
}
export default ReviewPage;
