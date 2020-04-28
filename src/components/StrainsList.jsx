import React from 'react';
import StrainsCard from './StrainsCard';

function StrainsList({ array }) {
  return(
    <div
      style={{ width: "90%", maxWidth: "550px", margin: "0 auto" }}
    >
      {array.map(item => {
          return (
            <StrainsCard />
          );
        })}
    </div>
  );
}

export default StrainsList;