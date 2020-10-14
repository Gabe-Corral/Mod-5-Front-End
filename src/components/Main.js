import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Review from './Album'
import ReviewPage from './ReviewPage'
import AllReviews from './AllReviews'
import WriteAReview from './WriteAReview'
import Search from './Search'
import ArtistPage from './ArtistPage'

const url = "http://localhost:3000";

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      artists: [],
      currentArtist: {},
      currentReview: {},
      showResults: false,
      searchWords: "",
      searchReseults: []
    }

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
  }

  componentDidMount = () => {
    fetch(`${url}/review`)
    .then(res => res.json())
    .then(reviews => this.setState({ reviews }))

    fetch(`${url}/artist`)
    .then(res => res.json())
    .then(artists => this.setState({ artists }))
  }

  getFullReview = (review) => {
    this.state.reviews.forEach(r => {
      if (r.id === review.id) {
        this.setState({ currentReview: r });
      }
    })
    this.setState({ showResults: false })
  }

  handleSearchBar = (e) => {
    e.preventDefault()
    this.setState({ showResults: true });
    this.handleSearchResults(e)
  }

  handleSearchResults = (e) => {
    let search = e.target.value;
    const searched = this.state.reviews.filter(r => r.title.includes(search))
    this.setState({ searchReseults: searched })
  }

  setCurrentArtist = (artistName) => {
    this.state.artists.forEach(a => {
      if (artistName === a.name) {
        this.setState({ currentArtist: a })
      }
    })
  }

  render() {
    const sortedReviews = this.state.reviews.sort(function(a, b) {
      return b.rating - a.rating;
    })
    return (
      <div className="nav-bar">
      <Router>
      <div className="topnav">
      <a href="/">Home</a>
      <a href="/reviews" className="sub-menu">Reviews</a>
      <div className="hidden-menu">
        <a href="/write">Write a review</a>
      </div>
      {this.props.loggedInStatus ? (
        <a onClick={this.props.handleLogout} href="/">Logout</a>
      ) : (
        <a href="/login">Login</a>
      )}
      <div>
        <input onChange={this.handleSearchBar}
        className="search-bar" type="text" placeholder="Search.." />
        {this.state.showResults ? (
          <div className="search-table">
            {this.state.searchReseults.map(r => <Search review={r} key={r.id} getFullReview={this.getFullReview} />)}
          </div>
        ) : (
          ""
        )}
      </div>
      </div>

      <Switch>
      <Route exact path="/reviews">
      <div>
      <label>Genre</label>
      <select>
      <option>All</option>
      <option>Folk</option>
      <option>experimental</option>
      <option>Metal</option>
      <option>Rock</option>
      </select>
      </div>
        {this.state.reviews.map(r => <AllReviews review={r} key={r.id} getFullReview={this.getFullReview}/>)}
      </Route>
      <Route exact path="/login">
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
      </Route>
      <Route exact path="/">
        <div className="reviews">
          <h3>Top Charts:</h3>
          {sortedReviews.map(r => <Review review={r} key={r.id} getFullReview={this.getFullReview} />)}
          <div className="recent-reviews">
        </div>
      </div>
      </Route>
      <Route exect path="/write">
        <WriteAReview user={this.props.user}/>
      </Route>
      <Route path="/artist/:name">
        <ArtistPage
        currentArtist={this.state.currentArtist}
        getFullReview={this.getFullReview}/>
      </Route>
      <Route path="/:id">
        <ReviewPage
        currentReview={this.state.currentReview}
        setCurrentArtist={this.setCurrentArtist}/>
      </Route>
      </Switch>
      </Router>
      </div>
    )
  }
}
export default Main;
