import React, { useState, useEffect } from 'react';
import Comments from './Comments'
import Tracks from './Tracks'
import { useHistory } from 'react-router-dom';
//import { useCookies } from 'react-cookie';

const ReviewPage = (props) => {
  const [comments, setComments] = useState();
  const [commentForm, setCommentForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const url = "http://localhost:3000";

  useEffect(() => {
    if (loading) {
      const id = props.currentReview.id;
      fetch(`${url}/getcomments/${id}`)
        .then(res => res.json())
        .then(comments => {
          setComments(comments)
      })
    }
    setLoading(false);
  }, [loading, setLoading, props.currentReview.id])


  const handleClick = () => {
    const artist = props.currentReview.artist.split(" ").join("").toLowerCase();
    history.push(`/artist/${artist}`);
    props.setCurrentArtist(props.currentReview.artist);
  }

  const handleComment = () => {
    setCommentForm(!commentForm);
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

  const handleEdit = () => {
    history.push(`/review/${props.currentReview.id}`)
  }

  const handleDelete = () => {
    fetch(`${url}/review/${props.currentReview.id}`, {
      method: 'DELETE'
    })
    history.push(`username/${props.user.username}`)
  }

  return (
    <div>
    {props.user.id === props.currentReview.user_id ? (
      <div>
      <button onClick={handleEdit}
        className="edit-btn">edit</button>
        <button onClick={handleDelete}
        className="edit-btn">Delete</button>
      </div>
    ) : ""}
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
    onClick={handleComment}>Comment</button>
    {commentForm ? (
      <div className="write-comment-container">
      <form className="comment-form" onSubmit={handlePostComment}>
      <input placeholder="comment.." name="comment" />
      <button type="submit">Submit</button>
      </form>
      </div>
    ) : (
      ""
    )}
    <div className="test">
    <h3 className="comments-header">Comments:</h3>
    <h3 className="tracks">Tracks:</h3>
    </div>
    {props.currentReview.songs.map(s => <Tracks track={s} key={s} />)}
    {Array.isArray(comments) ? (
      comments.map(c => <Comments comment={c} key={c.id} />)
    ) : (
      ""
    )}
    </div>
  )
}
export default ReviewPage;
