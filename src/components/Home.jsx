import React, { useState, useEffect } from 'react';
import axios from 'axios';

import StrainsList from './StrainsList';

function Home() {
  const url = "https://medcab6api.herokuapp.com/products";
  const [strains, setStrains] = useState([]);

  useEffect(() => {
    axios.get(`${url}/fetch`)
    .then(res => {
      setStrains(res.data);
      console.log(res.data);
    })
  }, []);

  return(
    <StrainsList strainsArray={strains}/>
  );
}

export default Home;