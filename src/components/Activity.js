import React, { useState, useEffect } from 'react';
import AllReviews from './AllReviews'

const Activity = (props) => {
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] =  useState([]);
  const url = "http://localhost:3000";
  const user = props.user;

  useEffect(() => {
    if (loading && user.id !== undefined) {
      fetch(`${url}/activityfeed/${user.id}`)
      .then(res => res.json())
      .then(feeds => setFeed(feeds))
      setLoading(false)
    }
  }, [loading, setLoading, user.id])

  const sortedReviews = feed.sort(function(a, b) {
    return new Date(b[Object.keys(b)[0]].created_at) -
    new Date(a[Object.keys(a)[0]].created_at)
  })

  return (
    <div>
      <div className="activity-feed">
        <h2>Activity Feed</h2>
      </div>

      {sortedReviews.map(f => {
        return (
          <div key={f[Object.keys(f)[0]].id}
            className="activity-names">
            <h2>{Object.keys(f)[0]}</h2>
            <AllReviews
            getFullReview={props.getFullReview}
            key={f[Object.keys(f)[0]].id}
            review={f[Object.keys(f)[0]]}/>
          </div>
        )
      })}

    </div>
  )
}

export default Activity;
