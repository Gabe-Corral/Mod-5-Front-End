import React from 'react';

const url = "http://localhost:3000";

class WriteAReview extends React.Component {

  constructor() {
    super();
    this.state = {
      review: "",
      submitted: false,
      subReview: {}
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const newReview = {
      user_id: this.props.user.id,
      rating: e.target.rating.value,
      artist: e.target.artist.value,
      title: e.target.title.value,
      genre: e.target.genre.value,
      img: e.target.artwork.value,
      release_date: e.target.release_date.value,
      review: this.state.review
    }

    fetch(`${url}/review`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(newReview)
    })

    this.setState({ submitted: true })
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ review: e.target.value })
  }

  render() {
    return (
      <div className="write-container">
      {this.props.user.id ? (
        <form onSubmit={this.handleSubmit}>
          <label>Artist Name:</label>
          <input type="text" name="artist"/>
          <label>Album Title:</label>
          <input type="text" name="title"/>
          <label>Rating:</label>
          <input type="number" name="rating"/>
          <label>Genre:</label>
          <input type="text" name="genre" />
          <label>Album Artwork:</label>
          <input type="text" name="artwork"/>
          <label>Release Date:</label>
          <input type="number" name="release_date"/>
          <label>Review:</label>
          <textarea value={this.state.value} onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <h3>You must be logged in to write a review.</h3>
      )}
      {this.state.submitted ? (
        <div className="submitted-review">
        <h3>Thank you for submiting a review.</h3>
        <h3>You can find your review <a href="/reviews">here</a></h3>
        </div>
      ) : ""}
      </div>
    )
  }
}

export default WriteAReview;
