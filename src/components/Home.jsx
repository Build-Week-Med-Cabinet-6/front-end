import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import Search from './Search';
import StrainsList from './StrainsList';

function Home() {
  const [strains, setStrains] = useState([]);

  const strainsQuery = (query) => setStrains(query);

  return(
    <>
      <Header>
        <Search strainsQuery={strainsQuery}/>
        <Link to="/profile">Profile</Link>
      </Header>
      <div>
        <StrainsList strainsArray={strains}/>
      </div>
    </>
  );
}

export default Home;