import React, { useState, useEffect } from 'react';

import Search from './Search';
import StrainsList from './StrainsList';

function Home() {
  const [strains, setStrains] = useState([]);

  const strainsQuery = (query) => setStrains(query);

  return(
    <div>
      <Search strainsQuery={strainsQuery}/>
      <StrainsList strainsArray={strains}/>
    </div>
  );
}

export default Home;