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
      .then(albums => this.setState({ albums }))
  }

  render() {
    return (
      <div className="artist-container">
      <div className="artist-contents">
        <h2>{this.props.currentArtist.name}</h2>
        <h3>{this.props.currentArtist.genre}</h3>
        </div>
        {this.state.albums.map(a => <AllReviews review={a[0]} key={a[0].id} getFullReview={this.props.getFullReview}/>)}
      </div>
    )
  }
}

export default ArtistPage;
