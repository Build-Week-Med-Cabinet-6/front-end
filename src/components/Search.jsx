import React, { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FormErrorAlert from './FormErrorAlert';
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
  const searchAuthSchema = yup.object().shape({
    textSearch: yup
      .string()
      .required('Please enter a search term.'),
  });

  const [searchStrings, setSearchStrings] = useState(initialSearchStrings);
  const [textSearch, setTextSearch] = useState("");
  const [textSearchError, setTextSearchError] = useState("");
  const [effectsDropdown, setEffectsDropdown] = useState(effects);
  const [flavorsDropdown, setFlavorsDropdown] = useState(flavors);
  const [dropdownOpen, setDropdownOpen] = useState(initialDropdownState);
  const [alertVisible, setAlertVisible] = useState(false);

  const onDismiss = () => setAlertVisible(false);
  const toggle = (id) => {
    return setDropdownOpen({
      ...dropdownOpen,
      [id]: !dropdownOpen[id]
    });
  };

  const generateUrlEncodedParams = (keyValuesArray) => { // keyValuesArray should be an array of arrays.
    const params = new URLSearchParams();                // each array containing the key and value at respective indexes.
    keyValuesArray.forEach(pair => {
      params.append(pair[0], pair[1]);
    });

    return params;
  }

  const onTextSearch = (evt) => {
    evt.preventDefault();
    const params = generateUrlEncodedParams([["text", textSearch]]);

    yup.reach(searchAuthSchema, 'textSearch')
    .validate(textSearch)
    .then(() => {
      setTextSearch("");
  
      axios.post(`${url}/search`, params)
      .then(res => strainsQuery(res.data))
      .catch(err => console.log(err));
    })
    .catch(err => {
      const error = err.errors[0];
      setAlertVisible(true)
      return setTextSearchError(error);
    });
  }

  const onSearchSubmit = (evt) => {
    evt.preventDefault();

    setEffectsDropdown(effects);
    setFlavorsDropdown(flavors);

    setSearchStrings(initialSearchStrings);

    const paramsArray = [
      ['effects', searchStrings.effects],
      ['flavors', searchStrings.flavors]
    ];
    const params = generateUrlEncodedParams(paramsArray)
    axios.post(`${url}/query`, params)
    .then(res => strainsQuery(res.data))
    .catch(err => console.log(err));
  }

  const onSearchTextChange = (evt) => {
    setAlertVisible(false)
    return setTextSearch(evt.target.value)
  };

  const onAddSearchTerm = (evt) => {
    const value = evt.target.value;
    const myCategory = evt.target.name;
    const mySearchString = searchStrings[myCategory];
    const searchString = mySearchString 
      ? `${mySearchString}, ${value}`
      : value;

      const toggleDropdownSearchTerm = (dropdown, setDropdown) => {
        const dropdownItemState = dropdown[value][1]
        return setDropdown({
          ...dropdown,
          [value]: [value, !dropdownItemState],
        });
      }

      if(myCategory === "effects") {
        toggleDropdownSearchTerm(effectsDropdown, setEffectsDropdown);
      } else if(myCategory ===  "flavors") {
        toggleDropdownSearchTerm(flavorsDropdown, setFlavorsDropdown);
      }

    return setSearchStrings({
      ...searchStrings,
      [myCategory]: searchString,
    });
  }

  return(
    <form
      onSubmit={onTextSearch}
      style={{
        width: "50%",
        minWidth: "450px",
        display: 'flex',
        padding: '0',
        margin: '0',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <input onChange={onSearchTextChange} type="text" name="search" id="search" placeholder="Search" value={textSearch}/>
        <FormErrorAlert
            render={alertVisible}
            errorMessage={textSearchError}
          />
      </div>
      <Dropdown isOpen={dropdownOpen.effects} toggle={() => toggle("effects")}>
        <DropdownToggle caret>
          Effects
        </DropdownToggle>
        <DropdownMenu>
          {Object.values(effectsDropdown).map(effect => {
              return(
                <DropdownItem
                  style={{ backgroundColor: effect[1] ? "#CCC" : "", }}
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
                  style={{ backgroundColor: flavor[1] ? "#CCC" : "", }}
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
          <DropdownItem onClick={onSearchSubmit} name="search">Dropdown Search</DropdownItem>
          <DropdownItem onClick={onTextSearch} name="search">Text Search</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </form>
  );
}

export default Search;