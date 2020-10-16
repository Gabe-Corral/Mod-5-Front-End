import React, { useState, useEffect } from 'react';
import Comments from './Comments'
import { useHistory } from 'react-router-dom';

const ReviewPage = (props) => {
  const [comments, setComments] = useState();
  const [commentForm, setCommentForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const url = "http://localhost:3000";

  useEffect(() => {
    const id = props.currentReview.id;
    if (loading) {
      fetch(`${url}/getcomments/${id}`)
        .then(res => res.json())
        .then(comments => {
          setComments(comments)
      })
    }
    return () => setLoading(false);
  })

  const handleClick = () => {
    const artist = props.currentReview.artist.split(" ").join("").toLowerCase();
    history.push(`/artist/${artist}`);
    props.setCurrentArtist(props.currentReview.artist);
  }

  const handleComment = () => {
    setCommentForm(true);
  }

  const handlePostComment = (e) => {
    e.preventDefault()
    fetch(`${url}/comment`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        user_id: props.user.id,
        review_id: props.currentReview.id,
        username: props.user.username,
        comment: e.target.comment.value
      })
    })
    setLoading(true);
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
      <p className="full-review">
      {props.currentReview.review}
      </p>
    </div>
    </div>
    <button className="comment-button"
    onClick={handleComment}>Add a Comment</button>
    {commentForm ? (
      <div className="write-comment-container">
      <form className="comment-form" onSubmit={handlePostComment}>
      <textarea></textarea>
      <button type="submit">Post Comment</button>
      </form>
      </div>
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
