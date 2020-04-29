import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Search({ strainsQuery }) {
  const url = "https://medcab6api.herokuapp.com/products";
  const initialSearchStrings = {
    effects: "",
    flavors: "",
  };

  const [searchStrings, setSearchStrings] = useState(initialSearchStrings);

  const onSearchSubmit = (evt) => {
    evt.preventDefault();

    const params = new URLSearchParams(); // generate parameters in correct format 
    params.append('effects', searchStrings.effects);
    params.append('flavors', searchStrings.flavors);

    axios.post(`${url}/query`, params)
    .then(res => strainsQuery(res.data))
    .catch(err => console.log(err));
  }

  const onAddSearchTerm = (evt) => {
    const searchTerm = evt.target.value;
    const targetId = evt.target.id;
    const targetSearchString = searchStrings[targetId];
    const searchString = targetSearchString 
      ? `${targetSearchString}, ${searchTerm}`
      : searchTerm;
  
    return setSearchStrings({
      ...searchStrings,
      [targetId]: searchString,
    });
  }

  return(
    <form>
      <label htmlFor="effects">Effects:</label>
      <select onChange={onAddSearchTerm} id="effects" multiple>
        <option value="aroused">aroused</option>
        <option value="creative">creative</option>
        <option value="energetic">energetic</option>
        <option value="euphoric">euphoric</option>
      </select>

      <label htmlFor="flavors">Flavors:</label>
      <select onChange={onAddSearchTerm} id="flavors" multiple>
        <option value="ammonia">ammonia</option>
        <option value="apple">apple</option>
        <option value="apricot">apricot</option>
        <option value="berry">berry</option>
      </select>

      <button onClick={onSearchSubmit}>Search</button>
    </form>
  );
}

export default Search;