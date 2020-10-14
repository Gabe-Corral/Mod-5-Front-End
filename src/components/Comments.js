import React from 'react';

const Comments = (props) => {


  return (
    <div className="comment-container">
    {props.comment.comment}
    </div>
  )
}

export default Comments;
