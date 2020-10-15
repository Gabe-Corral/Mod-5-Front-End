import React from 'react';
import { useHistory } from 'react-router-dom';

const Search = (props) => {
  const history = useHistory();

  const handleClick = (artist) => {
    const name = artist.name.split(" ").join("")
    history.push(`/artist/${name}`)
    props.setCurrentArtist(artist.name)
  }

  return (
    <div>
      <div className="search-container"
       onClick={() => handleClick(props.artist)}>
       <div>
       {props.artist.name}
       </div>
      </div>
    </div>
    )
}

export default Search;
