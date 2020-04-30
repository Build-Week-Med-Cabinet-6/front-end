import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { effects, flavors } from '../constants';

function Search({ strainsQuery }) {
  const url = "https://medcab6api.herokuapp.com/products";
  const initialSearchStrings = {
    effects: "",
    flavors: "",
  };
  const initialDropdownState = {
    effects: false,
    flavors: false,
    search: false,
  }

  const [searchStrings, setSearchStrings] = useState(initialSearchStrings);
  const [textSearch, setTextSearch] = useState("");
  const [effectsDropdown, setEffectsDropdown] = useState(effects);
  const [flavorsDropdown, setFlavorsDropdown] = useState(flavors);
  const [dropdownOpen, setDropdownOpen] = useState(initialDropdownState);

  const toggle = (id) => {
    return setDropdownOpen({
      ...dropdownOpen,
      [id]: !dropdownOpen[id]
    });
  };

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
    const value = evt.target.value;
    const myCategory = evt.target.name;
    const mySearchString = searchStrings[myCategory];
    const searchString = mySearchString 
      ? `${mySearchString}, ${value}`
      : value;
  
    return setSearchStrings({
      ...searchStrings,
      [myCategory]: searchString,
    });
  }

  return(
    <form
      style={{
        width: "60%",
        maxWidth: "500px",
        display: 'flex',
        padding: '2vh 0',
        justifyContent: 'space-between',
      }}
    >
      <input onChange={onSearchTextChange} type="text" name="search" id="search" placeholder="Search" value={textSearch}/>
      <Dropdown isOpen={dropdownOpen.effects} toggle={() => toggle("effects")}>
        <DropdownToggle caret>
          Effects
        </DropdownToggle>
        <DropdownMenu>
          {Object.values(effectsDropdown).map(effect => {
              return(
                <DropdownItem 
                  onClick={onAddSearchTerm} 
                  name="effects" 
                  value={effect[0]}
                  >
                    {effect[0]}
                </DropdownItem>
                )})}
        </DropdownMenu>
      </Dropdown>

      <Dropdown isOpen={dropdownOpen.flavors} toggle={() => toggle("flavors")}>
        <DropdownToggle caret>
          Flavors
        </DropdownToggle>
        <DropdownMenu>
        {Object.values(flavorsDropdown).map(flavor => {
              return(
                <DropdownItem 
                  onClick={onAddSearchTerm} 
                  name="flavors" 
                  value={flavor[0]}
                  >
                    {flavor[0]}
                </DropdownItem>
                )})}
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={dropdownOpen.search} toggle={() => toggle("search")}>
        <DropdownToggle caret>
          Search
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={onSearchSubmit} name="search">Dropdown boxes Search</DropdownItem>
          <DropdownItem onClick={onTextSearch} name="search">Textbox Search</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </form>


    // <div>
    //   <form>
    //     <label htmlFor="search">Search:</label>
    //     <input onChange={onSearchTextChange} type="text" name="search" id="search" value={textSearch}/>
    //     <label htmlFor="effects">Effects:</label>
    //     <select onChange={onAddSearchTerm} id="effects" multiple>
    //       <option value="aroused">aroused</option>
    //       <option value="creative">creative</option>
    //       <option value="energetic">energetic</option>
    //       <option value="euphoric">euphoric</option>
    //     </select>

    //     <label htmlFor="flavors">Flavors:</label>
    //     <select onChange={onAddSearchTerm} id="flavors" multiple>
    //       <option value="ammonia">ammonia</option>
    //       <option value="apple">apple</option>
    //       <option value="apricot">apricot</option>
    //       <option value="berry">berry</option>
    //     </select>

    //     <button onClick={onSearchSubmit}>Search with Dropdowns</button>
    //     <button onClick={onTextSearch}>Search with text box</button>
    //   </form>
    // </div>
  );
}

export default Search;