import React from 'react';

function Search({ onAddSearchTerm, onSearchSubmit}) {
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