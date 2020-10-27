import React, { useState, useEffect } from 'react';
import AllReviews from './AllReviews'

const Profile = (props) => {
  const [reviews, setReviews] = useState(false)
  const [loading, setLoading] = useState(true)
  const url = "http://localhost:3000";
  const user = props.user;

  useEffect(() => {
    if (loading && user.id) {
      fetch(`${url}/userreviews/${user.id}`)
        .then(res => res.json())
        .then(res => {
          setReviews(res)
          setLoading(false)
      })
    }
  })

  return (
    <div className="profile-container">
      <h2>{user.username}</h2>
        <div className="user-reviews">
          <h3>Your Reviews:</h3>
          {reviews !== false ? (
            reviews.map(r => <AllReviews
              review={r} key={r.id} user={user}
              getFullReview={props.getFullReview} />)
          ) : "" }
        </div>
    </div>
  )
}
export default Profile
