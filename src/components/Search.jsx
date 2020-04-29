import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Search({ strainsQuery }) {
  const url = "https://medcab6api.herokuapp.com/products";
  const initialSearchStrings = {
    effects: "",
    flavors: "",
  };

  const [searchStrings, setSearchStrings] = useState(initialSearchStrings);
  const [textSearch, setTextSearch] = useState("");

  const generateUrlEncodedParams = (keyValuesArray) => { // keyValuesArray should be an array of arrays.
    const params = new URLSearchParams();                // each array containing the key and value at respective indexes.
    keyValuesArray.forEach(pair => {
      params.append(pair[0], pair[2]);
    });

    return params;
  }

  const onTextSearch = (evt) => {
    evt.preventDefault();

    const params = generateUrlEncodedParams([["text", textSearch]]);

    axios.post(`${url}/search`, params)
    .then(res => strainsQuery(res.data))
    .catch(err => console.log(err));
  }

  const onSearchSubmit = (evt) => {
    evt.preventDefault();
    const paramsArray = [
      ['effects', searchStrings.effects],
      ['flavors', searchStrings.flavors]
    ];
    const params = generateUrlEncodedParams(paramsArray)

    axios.post(`${url}/query`, params)
    .then(res => strainsQuery(res.data))
    .catch(err => console.log(err));
  }

  const onSearchTextChange = (evt) => setTextSearch(evt.target.value);

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
      <label htmlFor="search">Search:</label>
      <input onChange={onSearchTextChange} type="text" name="search" id="search" value={textSearch}/>
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

      <button onClick={onSearchSubmit}>Search with Dropdowns</button>
      <button onClick={onTextSearch}>Search with text box</button>
    </form>
  );
}

export default Search;