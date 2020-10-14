import React from 'react';
import AllReviews from './AllReviews'

class ArtistPage extends React.Component {

  state = {
    albums: []
  }

  componentDidMount = () => {
    const id = this.props.currentArtist.id;
    fetch(`http://localhost:3000/getalbums/${id}`)
      .then(res => res.json())
      .then(albums => this.setState({ albums: albums[0] }))
  }

  render() {
    return (
      <div className="artist-container">
        <h2>{this.props.currentArtist.name}</h2>
        <h3>{this.props.currentArtist.genre}</h3>
        {this.state.albums.map(a => <AllReviews review={a} key={a.id} getFullReview={this.props.getFullReview}/>)}
      </div>
    )
  }
}

export default ArtistPage;
